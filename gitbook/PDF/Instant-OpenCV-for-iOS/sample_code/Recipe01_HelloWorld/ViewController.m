//
//  ViewController.m
//  Recipe01_HelloWorld
//
//  Created by MichaelLedger on 2021/3/23.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Console output
    NSLog(@"Hello, World!");
    
    /*
     Error message:
     *** Terminating app due to uncaught exception 'NSObjectNotAvailableException', reason: 'UIAlertView is deprecated and unavailable for UIScene based applications, please use UIAlertController!'
     */
    // Alert window
//    UIAlertView *alert = [UIAlertView alloc];
//    alert = [alert initWithTitle:@"Hey there!" message:@"Welcome to OpenCV on iOS development community" delegate:nil cancelButtonTitle:@"Continue" otherButtonTitles:nil];
//    [alert show];
    
    /*
     Error message:
     [Presentation] Attempt to present <UIAlertController: 0x7fc976017000> on <ViewController: 0x7fc974c09b10> (from <ViewController: 0x7fc974c09b10>) whose view is not in the window hierarchy.
     */
    // Alert window
//    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Hey there!" message:@"Welcome to OpenCV on iOS development community" preferredStyle:UIAlertControllerStyleAlert];
//    UIAlertAction *continueAction = [UIAlertAction actionWithTitle:@"Continue" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
//        [alert dismissViewControllerAnimated:YES completion:nil];
//    }];
//    [alert addAction:continueAction];
//    [self presentViewController:alert animated:YES completion:nil];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    // Alert window
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Hey there!" message:@"Welcome to OpenCV on iOS development community" preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *continueAction = [UIAlertAction actionWithTitle:@"Continue" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [alert dismissViewControllerAnimated:YES completion:nil];
    }];
    [alert addAction:continueAction];
    [self presentViewController:alert animated:YES completion:nil];
}

@end
