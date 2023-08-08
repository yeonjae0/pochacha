package com.ssafy.oho.util.data.liargame.words;

import com.ssafy.oho.util.data.liargame.ExtractRandom;

public enum Object implements ExtractRandom {
    키보드,연필,텀블러,에어팟;

    @Override
    public Object getRandomValue() {
        return values()[(int)Math.random()*values().length];
    }
}
