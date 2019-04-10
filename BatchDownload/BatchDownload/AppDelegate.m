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
    
    // 韩语
//    for(int i=0;i<19;i++)//一共26个字母
//    {
//        //        printf ("%c",'a'+i);//因为ASCII连续，这里‘a'先转化成ASCII和i相加，再用%c转化为字符输出
//        for(int j=1;j<22;j++)
//        {
//            //音频
//            //    https://res.hjfile.cn/pt/m/zt/kr/zt_fayinbiao/audio/b15.mp3
//            NSString *audioLink = [NSString stringWithFormat:@"https://res.hjfile.cn/pt/m/zt/kr/zt_fayinbiao/audio/%c%d.mp3", 'a'+i, j];
//            [urlArray addObject:[NSURL URLWithString:audioLink]];
//
//            //图片
//            //  https://res.hjfile.cn/pt/m/zt/kr/zt_fayinbiao/img/pindu/a1.png
//            NSString *imgLink = [NSString stringWithFormat:@"https://res.hjfile.cn/pt/m/zt/kr/zt_fayinbiao/img/pindu/%c%d.png", 'a'+i, j];
//            [urlArray addObject:[NSURL URLWithString:imgLink]];
//        }
//    }
    
    //日语
    NSArray *gifNames = @[@"a1",@"i2",@"u3",@"e4",@"o5",@"ka6",@"ki7",@"ku8",@"ke9",@"ko10",@"sa11",@"si12",@"su13",@"se14",@"so15",@"ta16",@"ti17",@"tu18",@"te19",@"to20",@"na21",@"ni22",@"nu23",@"ne24",@"no25",@"ha26",@"hi27",@"hu28",@"he29",@"ho30",@"ma31",@"mi32",@"mu33",@"me34",@"mo35",@"ya36",@"i2",@"yu38",@"e4",@"yo40",@"ra41",@"ri42",@"ru43",@"re44",@"ro45",@"wa46",@"i2",@"u3",@"e4",@"wo50",@"n51"];
    for (NSInteger i = 0; i < gifNames.count; i ++) {
        NSString *gifName = [gifNames objectAtIndex:i];
        
        // http://res.hjfile.cn/pt/m/jp/50yin/img/gif/ping/ping_gif_a1.gif
        NSString *pingGifName = [NSString stringWithFormat:@"http://res.hjfile.cn/pt/m/jp/50yin/img/gif/ping/ping_gif_%@.gif", gifName];
        [urlArray addObject:[NSURL URLWithString:[pingGifName stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]]]];
        
        //http://res.hjfile.cn/pt/m/jp/50yin/img/gif/pian/pian_gif_ro45.gif
        NSString *pianGifName = [NSString stringWithFormat:@"http://res.hjfile.cn/pt/m/jp/50yin/img/gif/pian/pian_gif_%@.gif", gifName];
        [urlArray addObject:[NSURL URLWithString:[pianGifName stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]]]];
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
            NSString *filePath = [cachesPath stringByAppendingPathComponent:[[url pathExtension] stringByAppendingPathComponent:[url lastPathComponent]]];
            NSString *fileDir = [cachesPath stringByAppendingPathComponent:[url pathExtension]];
            NSString *fileName = [url lastPathComponent];
            BOOL isDir;
            if (![[NSFileManager defaultManager] fileExistsAtPath:fileDir isDirectory:&isDir])
            {
                NSError *createError;
                [[NSFileManager defaultManager] createDirectoryAtPath:fileDir withIntermediateDirectories:YES attributes:nil error:&createError];
                if (createError) NSLog(@"%@ create error:%@", fileDir, createError.localizedDescription);
            }
//            NSLog(@"%@", isDir ? @"isDir" : @"isNotDir");
            BOOL success = [data writeToFile:[fileDir stringByAppendingPathComponent:fileName] atomically:YES];
            NSLog(@"%@ download %@: %@", fileName, success ? @"success" : @"fail", filePath);
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
