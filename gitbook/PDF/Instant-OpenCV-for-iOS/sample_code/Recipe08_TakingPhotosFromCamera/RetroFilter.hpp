//
//  RetroFilter.hpp
//  Recipe08_TakingPhotosFromCamera
//
//  Created by LIANG XIN on 18/12/15.
//  Copyright © 2015 Kirill Kornyakov & Alexander Shishkov. All rights reserved.
//

#ifndef RetroFilter_hpp
#define RetroFilter_hpp

#include <stdio.h>

class RetroFilter
{
public:
    struct Parameters
    {
        cv::Size frameSize;
        cv::Mat fuzzyBorder;
        cv::Mat scratches;
    };
    RetroFilter(const Parameters& params);
    virtual ~RetroFilter() {};
    void applyToPhoto(const cv::Mat& frame, cv::Mat& retroFrame);
    void applyToVideo(const cv::Mat& frame, cv::Mat& retroFrame);
    
protected:
    Parameters params_;
    cv::RNG rng_;
    float multiplier_;
    cv::Mat borderColor_;
    cv::Mat scratchColor_;
    std::vector<cv::Mat> sepiaPlanes_;
    cv::Mat sepiaH_;
    cv::Mat sepiaS_;
};

#endif /* RetroFilter_hpp */
