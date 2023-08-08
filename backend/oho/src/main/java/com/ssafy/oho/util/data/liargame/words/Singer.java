package com.ssafy.oho.util.data.liargame.words;

import com.ssafy.oho.util.data.liargame.ExtractRandom;

public enum Singer implements ExtractRandom {
    BTS, BLACKPINK, EXO, IVE;

    public static String getRandomValue() {
        return String.valueOf(values()[(int)Math.random()*values().length]);
    }
}
