//
//  AppDelegate.m
//  BatchDownload
//
//  Created by MountainX on 2019/1/7.
//  Copyright © 2019年 MTX Software Technology Co.,Ltd. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    
    NSMutableArray *urlArray = [NSMutableArray array];
    for(int i=0;i<19;i++)//一共26个字母
    {
        //        printf ("%c",'a'+i);//因为ASCII连续，这里‘a'先转化成ASCII和i相加，再用%c转化为字符输出
        for(int j=1;j<22;j++)
        {
            //    https://res.hjfile.cn/pt/m/zt/kr/zt_fayinbiao/audio/b15.mp3
            NSString *link = [NSString stringWithFormat:@"https://res.hjfile.cn/pt/m/zt/kr/zt_fayinbiao/audio/%c%d.mp3", 'a'+i, j];
//            NSLog(@"%@", link);
            [urlArray addObject:[NSURL URLWithString:link]];
        }
    }
    
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    queue.maxConcurrentOperationCount = 4;

    NSBlockOperation *completionOperation = [NSBlockOperation blockOperationWithBlock:^{
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{
            //            [self methodToCallOnCompletion];
        }];
    }];

    NSString *cachesPath = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject;
    NSLog(@"cachesPath:%@", cachesPath);
    
    for (NSURL* url in urlArray)
    {
        NSBlockOperation *operation = [NSBlockOperation blockOperationWithBlock:^{
            NSData *data = [NSData dataWithContentsOfURL:url];
            NSString *filename = [cachesPath stringByAppendingPathComponent:[url lastPathComponent]];
            BOOL success = [data writeToFile:filename atomically:YES];
            NSLog(@"%@ download %@!", filename, success ? @"success" : @"fail");
        }];
        [completionOperation addDependency:operation];
    }

    [queue addOperations:completionOperation.dependencies waitUntilFinished:NO];
    [queue addOperation:completionOperation];
    
    return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


@end
