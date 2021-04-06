//
//  ViewController.mm
//  Recipe03_LinkingOpenCV
//
//  Created by MichaelLedger on 2021/3/24.
//

/*
 在opencv中有超过150种颜色空间转换方法（震惊-_-）
 但是经常用的只有BGR-灰度图和BGR-HSV

 使用函数cv2.cvtColor(input_image ，flag)，flag是转换类型

 BGR和灰度图的转换使用 cv2.COLOR_BGR2GRAY
 BGR和HSV的转换使用 cv2.COLOR_BGR2HSV
 */

#import "ViewController.h"
#import "opencv2/imgcodecs/ios.h"

@interface ViewController ()

@property (nonatomic, strong) UIImageView *iv;

@property (nonatomic, copy) NSArray<NSLayoutConstraint *> *horizontalConstraints;

@property (nonatomic, copy) NSArray<NSLayoutConstraint *> *verticalConstraints;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    UIImage *image = [UIImage imageNamed:@"FF7"];
    
    cv::Mat cvImage;

    // Convert UIImage* to cv::Mat
    UIImageToMat(image, cvImage);

    if (!cvImage.empty())
    {
        cv::Mat gray;

        // Convert the image to grayscale
//        cv::cvtColor(cvImage, gray, CV_RGBA2GRAY);
        cv::cvtColor(cvImage, gray, cv::COLOR_RGBA2GRAY);//COLOR_RGBA2GRAY、COLOR_BGR2GRAY、COLOR_BGR2HSV
        
        // Apply Gaussian filter to remove small edges
        cv::GaussianBlur(gray, gray, cv::Size(5, 5), 1.2, 1.2);

        // Calculate edges with Canny
        cv::Mat edges;
        cv::Canny(gray, edges, 0, 50);

        // Fill image with white color
        cvImage.setTo(cv::Scalar::all(255));

        // Change color on edges
        cvImage.setTo(cv::Scalar(0, 128, 255, 255), edges);

        // Convert cv::Mat to UIImage* and show the resulting image
        self.iv.image = MatToUIImage(cvImage);
    }
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
    
    NSArray<NSLayoutConstraint *> *verticalConstraints = [NSLayoutConstraint constraintsWithVisualFormat:@"V:|-topSafeMargin-[iv]-(==bottomSafeMargin@750)-|" options:0 metrics:metrics views:views];// Must be ==, >=, or <=
    [self.view addConstraints:verticalConstraints];
    _verticalConstraints = verticalConstraints;
}

@end
