package com.ssafy.oho.util.data.liargame.words;

import com.ssafy.oho.util.data.liargame.ExtractRandom;

public enum Sports implements ExtractRandom {
    축구,야구,베구,피구,테니스,배드민턴,클라이밍;

    @Override
    public Sports getRandomValue() {
        return values()[(int)Math.random()*values().length];
    }
}
