//
//  ViewController.m
//  Recipe07_ApplyingRetroEffect
//
//  Created by Gavin Xiang on 2021/4/1.
//

#import "ViewController.h"
#import "opencv2/imgcodecs/ios.h"
#import "RetroFilter.hpp"

@interface ViewController () <UINavigationControllerDelegate, UIImagePickerControllerDelegate, UIPopoverControllerDelegate>
{
    UIImage* retroImage;
    RetroFilter::Parameters params;
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
    
    // Load images
    UIImage* resImage = [UIImage imageNamed:@"scratches.png"];
    UIImageToMat(resImage, params.scratches);
    
    resImage = [UIImage imageNamed:@"fuzzyBorder.png"];
    UIImageToMat(resImage, params.fuzzyBorder);
    
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
    if (retroImage != nil)
    {
        UIImageWriteToSavedPhotosAlbum(retroImage, self,
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

- (UIImage*)applyFilter:(UIImage*)inputImage;
{
    cv::Mat frame;
    UIImageToMat(inputImage, frame);
    
    params.frameSize = frame.size();
    RetroFilter retroFilter(params);
    
    cv::Mat finalFrame;
    retroFilter.applyToPhoto(frame, finalFrame);
    
    return MatToUIImage(finalFrame);
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
    
    retroImage = [self applyFilter:temp];
    self.iv.image = retroImage;
    
    [self.saveButton setEnabled:YES];
}

@end

