//
//  ViewController.m
//  Recipe08_TakingPhotosFromCamera
//
//  Created by Gavin Xiang on 2021/4/1.
//

#import "ViewController.h"
#import "opencv2/imgcodecs/ios.h"
#import "opencv2/videoio/cap_ios.h"
#import "RetroFilter.hpp"

@interface ViewController () <CvPhotoCameraDelegate>
{
    UIImageView* resultView;
    RetroFilter::Parameters params;
    BOOL isFocusLocked, isExposureLocked, isBalanceLocked;
    BOOL isPositionFront;
}
@property (nonatomic, strong) CvPhotoCamera* photoCamera;
@property (weak, nonatomic) IBOutlet UIImageView *iv;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *startCaptureButton;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *takePhotoButton;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *switchCamerasButton;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *lockFocusButton;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *lockExposureButton;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *lockBalanceButton;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Initialize camera
    _photoCamera = [[CvPhotoCamera alloc]
                   initWithParentView:self.iv];
    _photoCamera.delegate = self;
    _photoCamera.defaultAVCaptureDevicePosition =
    AVCaptureDevicePositionFront;//AVCaptureDevicePositionBack
    isPositionFront = YES;
    _photoCamera.defaultAVCaptureSessionPreset =
    AVCaptureSessionPresetPhoto;
    _photoCamera.defaultAVCaptureVideoOrientation =
    AVCaptureVideoOrientationPortrait;
    _photoCamera.defaultFPS = 30;
    
    // Load images
    UIImage* resImage = [UIImage imageNamed:@"scratches.png"];
    UIImageToMat(resImage, params.scratches);
    
    resImage = [UIImage imageNamed:@"fuzzyBorder.png"];
    UIImageToMat(resImage, params.fuzzyBorder);
    
    [self.takePhotoButton setEnabled:NO];
    [self.switchCamerasButton setEnabled:NO];
}

- (void)viewDidDisappear:(BOOL)animated
{
    [self.photoCamera stop];
    [self.takePhotoButton setEnabled:NO];
    [self.startCaptureButton setEnabled:YES];
    [self.switchCamerasButton setEnabled:NO];
}

- (IBAction)startCaptureButtonPressed:(UIBarButtonItem *)sender {
    [resultView removeFromSuperview];
    [self.photoCamera start];
    [self.takePhotoButton setEnabled:YES];
    [self.startCaptureButton setEnabled:NO];
    [self.switchCamerasButton setEnabled:YES];
}

- (IBAction)switchCamerasButtonPressed:(UIBarButtonItem *)sender {
    // Crashed in OpenCV 4.5.1 & 3.4.10: Thread 1: EXC_BAD_ACCESS (code=1, address=0x2f9c2ad80)
    // Reverting back to OpenCV 3.0.0 will solve this problem.
    // It is unfortunately not easy to debug deeper into the source code and find the exact problem.
    [self.photoCamera switchCameras];
    isPositionFront = !isPositionFront;
}

- (IBAction)takePhotoButtonPressed:(UIBarButtonItem *)sender {
    [self.photoCamera takePicture];
    [self.takePhotoButton setEnabled:NO];
    [self.startCaptureButton setEnabled:NO];
    [self.switchCamerasButton setEnabled:NO];
}

- (IBAction)lockFocusButtonPressed:(UIBarButtonItem *)sender {
    if (isFocusLocked)
    {
        [self.photoCamera unlockFocus];
        [self.lockFocusButton setTitle:@"Lock focus"];
        isFocusLocked = NO;
    } else {
        [self.photoCamera lockFocus];
        [self.lockFocusButton setTitle:@"Unlock focus"];
        isFocusLocked = YES;
    }
}

- (IBAction)lockExposureButtonPressed:(UIBarButtonItem *)sender {
    if (isExposureLocked)
    {
        [self.photoCamera unlockExposure];
        [self.lockExposureButton setTitle:@"Lock exposure"];
        isExposureLocked = NO;
    } else {
        [self.photoCamera lockExposure];
        [self.lockExposureButton setTitle:@"Unlock exposure"];
        isExposureLocked = YES;
    }
}

- (IBAction)lockBalanceButtonPressed:(UIBarButtonItem *)sender {
    if (isBalanceLocked)
    {
        [self.photoCamera unlockBalance];
        [self.lockBalanceButton setTitle:@"Lock balance"];
        isBalanceLocked = NO;
    } else {
        [self.photoCamera lockBalance];
        [self.lockBalanceButton setTitle:@"Unlock balance"];
        isBalanceLocked = YES;
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
    
    UIImage* result = MatToUIImage(finalFrame);
    return [UIImage imageWithCGImage:[result CGImage]
                               scale:1.0
                         orientation:isPositionFront ? UIImageOrientationLeftMirrored : UIImageOrientationRight];
}

- (void)photoCamera:(CvPhotoCamera*)camera
      capturedImage:(UIImage *)image;
{
    [camera stop];
    
    UIImage* result = [self applyFilter:image];
    CGFloat fuzzyBorderWidth = 25 * [UIScreen mainScreen].scale;
    CGFloat resultImageExpectedWidth = CGRectGetWidth(self.iv.bounds) + 2 * fuzzyBorderWidth;
    CGFloat resultImageExpectedHeight = CGRectGetHeight(self.iv.bounds) + 2 * fuzzyBorderWidth;
    CGFloat resultViewWidth = [UIScreen mainScreen].bounds.size.width;
    CGFloat resultViewHeight = resultViewWidth * (resultImageExpectedHeight / resultImageExpectedWidth);
    resultView = [[UIImageView alloc]
                  initWithFrame:CGRectMake(0, 0, resultViewWidth, resultViewHeight)];
    [resultView setImage:result];
    [self.navigationController.view addSubview:resultView];
    resultView.center = self.navigationController.view.center;
    
    [self.takePhotoButton setEnabled:NO];
    [self.startCaptureButton setEnabled:YES];
    [self.switchCamerasButton setEnabled:NO];
    
    [self saveImage:[self imageFromView:[self snapshotFromView:resultView]]];
}

-(void)saveImage:(UIImage *)retroImage {
    UIImageWriteToSavedPhotosAlbum(retroImage, self,
                                   nil, NULL);
    
    UIAlertController *alertVc = [UIAlertController alertControllerWithTitle:@"Status" message:@"Saved to the Gallery!" preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"Continue" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
    }];
    [alertVc addAction:cancelAction];
    [self presentViewController:alertVc animated:YES completion:nil];
}

- (void)photoCameraCancel:(CvPhotoCamera*)camera;
{
}

- (void)dealloc
{
    [self.photoCamera stop];
    self.photoCamera.delegate = nil;
}

#pragma mark - Helper
- (UIView *)snapshotFromView:(UIView *)inputView {
    UIImage *image = [self imageFromView:inputView];
    UIImageView *imgView = [[UIImageView alloc]initWithImage:image];
    UIView *snapshot1 = imgView;
//    UIView *snapshot1 = [inputView snapshotViewAfterScreenUpdates:YES];
    snapshot1.layer.masksToBounds = NO;
    snapshot1.layer.cornerRadius = 0.0;
    snapshot1.layer.shadowOffset = CGSizeMake(5.0, 5.0);
    snapshot1.layer.shadowRadius = 1.0;
    snapshot1.layer.shadowOpacity = 0.4;

    return snapshot1;
}
- (UIImage *)imageFromView:(UIView *)snapView {
//    UIGraphicsBeginImageContext(snapView.frame.size);
    UIGraphicsBeginImageContextWithOptions(snapView.frame.size, NO, [UIScreen mainScreen].scale);
    CGContextRef context = UIGraphicsGetCurrentContext();
    [snapView.layer renderInContext:context];
    UIImage *targetImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return targetImage;
}

@end


