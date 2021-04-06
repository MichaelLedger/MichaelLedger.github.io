//
//  ViewController.mm
//  Recipe04_DetectingFaces
//
//  Created by Gavin Xiang on 2021/3/29.
//

#import "ViewController.h"
#import "opencv2/imgcodecs/ios.h"

@interface ViewController ()
{
    cv::CascadeClassifier faceDetector;
}

@property (nonatomic, strong) UIImageView *iv;

@property (nonatomic, copy) NSArray<NSLayoutConstraint *> *horizontalConstraints;

@property (nonatomic, copy) NSArray<NSLayoutConstraint *> *verticalConstraints;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // Load cascade classifier from the XML file
    NSString* cascadePath = [[NSBundle mainBundle]
                             pathForResource:@"haarcascade_frontalface_alt2"
                             ofType:@"xml"];
    faceDetector.load([cascadePath UTF8String]);
    
    //Load image with face
    UIImage* image = [UIImage imageNamed:@"My Own Swordsman"];//lena.png、My Own Swordsman.jpeg
    cv::Mat faceImage;
    UIImageToMat(image, faceImage);
    
    // Convert to grayscale
    cv::Mat gray;
    cvtColor(faceImage, gray, cv::COLOR_BGR2GRAY);//CV_BGR2GRAY
    
    // Detect faces
    std::vector<cv::Rect> faces;
    faceDetector.detectMultiScale(gray, faces, 1.1,
                                  2, 0|cv::CASCADE_SCALE_IMAGE, cv::Size(30, 30));//CV_HAAR_SCALE_IMAGE
    
    // Draw all detected faces
    for(unsigned int i = 0; i < faces.size(); i++)
    {
        const cv::Rect& face = faces[i];
        // Get top-left and bottom-right corner points
        cv::Point tl(face.x, face.y);
        cv::Point br = tl + cv::Point(face.width, face.height);
        
        // Draw rectangle around the face
        cv::Scalar magenta = cv::Scalar(255, 0, 255);
        cv::rectangle(faceImage, tl, br, magenta, 4, 8, 0);
    }
    
    // Show resulting image
    self.iv.image = MatToUIImage(faceImage);
}

#pragma mark - Lazy Loader
- (UIImageView *)iv {
    if (_iv == nil) {
        _iv = [UIImageView new];
        //防止苹果把默认设置的Autoresizing属性转成Autolayout，造成错误
        _iv.translatesAutoresizingMaskIntoConstraints = NO;
        _iv.backgroundColor = [UIColor lightGrayColor];
        _iv.contentMode = UIViewContentModeScaleAspectFit;
        [self.view addSubview:_iv];
    }
    return _iv;
}

- (void)viewSafeAreaInsetsDidChange {
    [super viewSafeAreaInsetsDidChange];
    
    [self.view removeConstraints:_horizontalConstraints];
    [self.view removeConstraints:_verticalConstraints];
    
    CGFloat topSafeMargin = self.view.safeAreaInsets.top;
    CGFloat bottomSafeMargin = self.view.safeAreaInsets.bottom;
    CGFloat leftSafeMargin = self.view.safeAreaInsets.left;
    CGFloat rightSafeMargin = self.view.safeAreaInsets.right;
    
    NSDictionary *views = @{@"iv" : self.iv};
    NSDictionary<NSString *,id> *metrics = @{
        @"topSafeMargin" : [NSNumber numberWithFloat:topSafeMargin],
        @"bottomSafeMargin" : [NSNumber numberWithFloat:bottomSafeMargin],
        @"leftSafeMargin" : [NSNumber numberWithFloat:leftSafeMargin],
        @"rightSafeMargin" : [NSNumber numberWithFloat:rightSafeMargin]
    };

    NSArray<NSLayoutConstraint *> *horizontalConstraints = [NSLayoutConstraint constraintsWithVisualFormat:@"H:|-leftSafeMargin-[iv]-rightSafeMargin-|" options:0 metrics:metrics views:views];
    [self.view addConstraints:horizontalConstraints];
    _horizontalConstraints = horizontalConstraints;
    
    NSArray<NSLayoutConstraint *> *verticalConstraints = [NSLayoutConstraint constraintsWithVisualFormat:@"V:|-topSafeMargin-[iv]-(==bottomSafeMargin@1000)-|" options:0 metrics:metrics views:views];// Must be ==, >=, or <=
    [self.view addConstraints:verticalConstraints];
    _verticalConstraints = verticalConstraints;
    
    [self.iv layoutIfNeeded];
}

@end

