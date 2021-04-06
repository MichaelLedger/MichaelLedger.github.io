//
//  ViewController.m
//  Recipe02_DisplayingImage
//
//  Created by MichaelLedger on 2021/3/23.
//

#import "ViewController.h"

@interface ViewController ()

@property (weak, nonatomic) IBOutlet UIImageView *imageView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Read the image
    /*
     这个方法用一个指定的名字在系统缓存中查找并返回一个图片对象如果它存在的话。如果缓存中没有找到相应的图片，这个方法从指定的文档中加
     载然后缓存并返回这个对象。因此的优点是当加载时会缓存图片。所以当图片会频繁的使用时，那么用的方法会比较好。但正是因此使用会缓存图片，即
     将图片的数据放在内存中，iOS的内存非常珍贵并且在内存消耗过大时，会强制释放内存，即会遇到memory warnings。
     
     对于同一个图像系统只会把它Cache到内存一次，这对于图像的重复利用是非常有优势的。例如：你需要在一个TableView里重复加载同样一个图标，
     那么用imageNamed加载图像，系统会把那个图标Cache到内存，在Table里每次利用那个图像的时候，只会把图片指针指向同一块内存。
     这种情况使用imageNamed加载图像就会变得非常有效。
     */
//    UIImage *image = [UIImage imageNamed:@"picture"];
    
    /*
     仅加载图片，图像数据不会缓存。因此对于较大的图片以及使用情况较少时，那就可以用该方法，降低内存消耗
     */
    NSString *imagePath = [[NSBundle mainBundle] pathForResource:@"picture" ofType:@"jpg"];
//    NSData *imageData = [NSData dataWithContentsOfFile:imagePath];
//    UIImage *image = [UIImage imageWithData:imageData];
    UIImage *image = [UIImage imageWithContentsOfFile:imagePath];
    
    _imageView.image = image; // Displaying the image
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        self->_imageView.image = nil; // Eliminate the image after 3 seconds
    });
}


@end
