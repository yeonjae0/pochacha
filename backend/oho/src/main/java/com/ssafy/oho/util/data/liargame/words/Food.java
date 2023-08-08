package com.ssafy.oho.util.data.liargame.words;

import com.ssafy.oho.util.data.liargame.ExtractRandom;

public enum Food implements ExtractRandom {
    사탕,스파게티,마라탕,초콜릿,라면,초코파이,초코하임,멘토스;


    @Override
    public Food getRandomValue() {
        return values()[(int)Math.random()*values().length];
    }
}
