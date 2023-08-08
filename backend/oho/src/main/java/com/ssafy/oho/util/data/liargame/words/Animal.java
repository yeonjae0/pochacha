package com.ssafy.oho.util.data.liargame.words;

import com.ssafy.oho.util.data.liargame.ExtractRandom;

public enum Animal implements ExtractRandom{
    사자,코끼리,고양이,재규어,물개,펭귄,북극곰;

    @Override
    public Animal getRandomValue() {
        return values()[(int)Math.random()*values().length];
    }
}
