//
//  PostcardPrinter.hpp
//  Recipe05_PrintingPostcard
//
//  C++ class header file
//
//  Created by LIANG XIN on 3/12/15.
//  Copyright © 2015 Kirill Kornyakov & Alexander Shishkov. All rights reserved.
//


#pragma once

#include "opencv2/core/core.hpp"

class PostcardPrinter
{
public:
    struct Parameters
    {
        cv::Mat face;
        cv::Mat texture;
        cv::Mat text;
    };
    
    PostcardPrinter(Parameters& parameters);
    virtual ~PostcardPrinter() {}
    
    void print(cv::Mat& postcard) const;
    
protected:
    void markup();
    void crumple(cv::Mat& image, const cv::Mat& texture,
                 const cv::Mat& mask = cv::Mat()) const;
    void printFragment(cv::Mat& placeForFragment,
                       const cv::Mat& fragment) const;
    void alphaBlendC3(const cv::Mat& src, cv::Mat& dst,
                      const cv::Mat& alpha) const;
    
    Parameters params_;
    cv::Rect faceRoi_;
    cv::Rect textRoi_;
};
