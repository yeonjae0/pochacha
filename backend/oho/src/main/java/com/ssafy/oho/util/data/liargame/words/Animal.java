package com.ssafy.oho.util.data.liargame.words;

import com.ssafy.oho.util.data.liargame.ExtractRandom;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum Animal implements ExtractRandom{
    사자,코끼리,고양이,재규어,물개,펭귄,북극곰;

    public static String getRandomValue() {
        return String.valueOf(values()[(int)Math.random()*values().length]);
    }
}
