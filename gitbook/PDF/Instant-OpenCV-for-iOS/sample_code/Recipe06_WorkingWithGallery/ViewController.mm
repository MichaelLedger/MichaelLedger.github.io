//
//  ViewController.m
//  Recipe06_WorkingWithGallery
//
//  Created by Gavin Xiang on 2021/4/1.
//

#import "ViewController.h"
#import "opencv2/imgcodecs/ios.h"
#import "PostcardPrinter.hpp"

@interface ViewController () <UINavigationControllerDelegate, UIImagePickerControllerDelegate, UIPopoverControllerDelegate>
{
    UIImage* postcardImage;
    cv::CascadeClassifier faceDetector;
}
/*
 'UIPopoverController' is deprecated: first deprecated in iOS 9.0 - UIPopoverController is deprecated. Popovers are now implemented as UIViewController presentations. Use a modal presentation style of UIModalPresentationPopover and UIPopoverPresentationController.
 */
@property (nonatomic, strong) UIPopoverController *popoverController;
@property (weak, nonatomic) IBOutlet UIImageView *iv;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *loadButton;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *saveButton;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Load face detector
    NSString* filename = [[NSBundle mainBundle]
                          pathForResource:@"haarcascade_frontalface_alt2"
                          ofType:@"xml"];
    faceDetector.load([filename UTF8String]);
    
    [self.saveButton setEnabled:NO];
}

- (IBAction)loadButtonPressed:(UIBarButtonItem *)sender {
    if (![UIImagePickerController isSourceTypeAvailable:
          UIImagePickerControllerSourceTypePhotoLibrary])
        return;
    
    UIImagePickerController* picker =
    [[UIImagePickerController alloc] init];
    picker.delegate = self;
    
    picker.sourceType =
    UIImagePickerControllerSourceTypePhotoLibrary;
    
    // iPad
    if ([[UIDevice currentDevice] userInterfaceIdiom] ==
        UIUserInterfaceIdiomPad)
    {
        if ([self.popoverController isPopoverVisible])
        {
            [self.popoverController dismissPopoverAnimated:YES];
        }
        else
        {
            self.popoverController =
            [[UIPopoverController alloc]
             initWithContentViewController:picker];
            
            self.popoverController.delegate = self;
            
            [self.popoverController
             presentPopoverFromBarButtonItem:sender
             permittedArrowDirections:UIPopoverArrowDirectionDown
             animated:YES];
        }
    }
    // iPhone
    else
    {
        [self presentViewController:picker
                           animated:YES
                         completion:nil];
    }
}

- (IBAction)saveButtonPressed:(UIBarButtonItem *)sender {
    if (postcardImage != nil)
    {
        UIImageWriteToSavedPhotosAlbum(postcardImage, self,
                                       nil, NULL);
        
        /*Terminating app due to uncaught exception 'NSObjectNotAvailableException', reason: 'UIAlertView is deprecated and unavailable for UIScene based applications, please use UIAlertController!'*/
        // Alert window
//        UIAlertView *alert = [UIAlertView alloc];
//        alert = [alert initWithTitle:@"Status"
//                             message:@"Saved to the Gallery!"
//                            delegate:nil
//                   cancelButtonTitle:@"Continue"
//                   otherButtonTitles:nil];
//        [alert show];
        
        UIAlertController *alertVc = [UIAlertController alertControllerWithTitle:@"Status" message:@"Saved to the Gallery!" preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"Continue" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
            
        }];
        [alertVc addAction:cancelAction];
        [self presentViewController:alertVc animated:YES completion:nil];
    }
}

// Macros for time measurements
#if 1
#define TS(name) int64 t_##name = cv::getTickCount()
#define TE(name) printf("TIMER_" #name ": %.2fms\n", \
1000.*((cv::getTickCount() - t_##name) / cv::getTickFrequency()))
#else
#define TS(name)
#define TE(name)
#endif

- (UIImage*)printPostcard:(UIImage*)image;
{
    // Convert input image to cv::Mat
    cv::Mat cvImage;
    UIImageToMat(image, cvImage);
    
    //FIXME: workaround for stretch error
    if (cvImage.rows > cvImage.cols)
    {
        cvImage = cvImage.t();
        flip(cvImage, cvImage, 1);
        resize(cvImage, cvImage,
               cv::Size(cvImage.cols, cvImage.rows*2));
    }
    
    // Convert the image to grayscale and stretch contrast
    cv::Mat gray;
    cvtColor(cvImage, gray, cv::COLOR_RGBA2GRAY);//CV_RGBA2GRAY
    equalizeHist(gray, gray);
    
    // Find faces in the image
    std::vector<cv::Rect> faces;
    TS(FaceDetection);
    faceDetector.detectMultiScale(gray, faces, 1.1, 2,
                                  cv::CASCADE_FIND_BIGGEST_OBJECT,//CV_HAAR_FIND_BIGGEST_OBJECT
                                  cv::Size(100,100));
    TE(FaceDetection);
    
    PostcardPrinter::Parameters parameters;
    
    // Initialize face image
    UIImage* resImage;
    if (faces.size())
    {
        int N = rand() % faces.size();
        cv::Rect faceRect = faces[N];
        
        // Extend the rectangle
        faceRect.x -= faceRect.width/4;
        faceRect.y -= faceRect.width/4;
        faceRect.width *= 1.5;
        faceRect.height = faceRect.width;
        
        cv::Rect imageRect(0, 0, cvImage.cols, cvImage.rows);
        faceRect = faceRect & imageRect;
        
        parameters.face = cvImage(faceRect);
    }
    else
    {
        resImage = [UIImage imageNamed:@"lena.jpg"];
        UIImageToMat(resImage, parameters.face);
    }
    
    // Load other images from resources
    resImage = [UIImage imageNamed:@"texture.jpg"];
    UIImageToMat(resImage, parameters.texture);
    cvtColor(parameters.texture, parameters.texture, cv::COLOR_RGBA2RGB);//CV_RGBA2RGB
    
    resImage = [UIImage imageNamed:@"text.png"];
    UIImageToMat(resImage, parameters.text, true);
    
    // Create PostcardPrinter class
    PostcardPrinter postcardPrinter(parameters);
    
    // Add vintage effect
    TS(Preprocessing);
    postcardPrinter.preprocessFace();
    TE(Preprocessing);
    
    // Print postcard
    cv::Mat postcard;
    TS(PostcardPrinting);
    postcardPrinter.print(postcard);
    TE(PostcardPrinting);
    
    return MatToUIImage(postcard);
}

- (void)imagePickerController: (UIImagePickerController*)picker
didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    if ([[UIDevice currentDevice] userInterfaceIdiom] ==
        UIUserInterfaceIdiomPad)
    {
        [self.popoverController dismissPopoverAnimated:YES];
    }
    else
    {
        [picker dismissViewControllerAnimated:YES
                                   completion:nil];
    }
    
    UIImage* temp =
    [info objectForKey:@"UIImagePickerControllerOriginalImage"];
    
    postcardImage = [self printPostcard:temp];
    self.iv.image = postcardImage;
    
    [self.saveButton setEnabled:YES];
}

@end
