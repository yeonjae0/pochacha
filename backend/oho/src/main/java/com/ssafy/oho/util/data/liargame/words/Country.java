package com.ssafy.oho.util.data.liargame.words;

import com.ssafy.oho.util.data.liargame.ExtractRandom;

public enum Country implements ExtractRandom {
    대한민국,일본,영국,미국,중국,캐나다,멕시코;

    public static String getRandomValue() {
        return String.valueOf(values()[(int)Math.random()*values().length]);
    }
}
