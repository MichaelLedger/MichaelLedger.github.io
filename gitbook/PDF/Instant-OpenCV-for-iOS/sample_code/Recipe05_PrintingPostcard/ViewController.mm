//
//  ViewController.m
//  Recipe05_PrintingPostcard
//
//  Created by Gavin Xiang on 2021/4/1.
//

#import "ViewController.h"
#import "opencv2/imgcodecs/ios.h"
#import "PostcardPrinter.hpp"

@interface ViewController ()

@property (nonatomic, strong) UIImageView *iv;

@property (nonatomic, copy) NSArray<NSLayoutConstraint *> *horizontalConstraints;

@property (nonatomic, copy) NSArray<NSLayoutConstraint *> *verticalConstraints;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    PostcardPrinter::Parameters params;
    
    // Load image with face
    UIImage* image = [UIImage imageNamed:@"lena.jpg"];
    UIImageToMat(image, params.face);
    
    // Load image with texture
    image = [UIImage imageNamed:@"texture.jpg"];
    UIImageToMat(image, params.texture);
    cvtColor(params.texture, params.texture, cv::COLOR_RGBA2RGB);//CV_RGBA2RGB
    
    // Load image with text
    image = [UIImage imageNamed:@"text.png"];
    UIImageToMat(image, params.text, true);
    
    // Create PostcardPrinter class
    PostcardPrinter postcardPrinter(params);
    
    // Print postcard, and measure printing time
    cv::Mat postcard;
    int64 timeStart = cv::getTickCount();
    postcardPrinter.print(postcard);
    int64 timeEnd = cv::getTickCount();
    float durationMs = 1000.f * float(timeEnd - timeStart) / cv::getTickFrequency();
    NSLog(@"Printing time = %.3fms", durationMs);
    
    if (!postcard.empty()) self.iv.image = MatToUIImage(postcard);
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
