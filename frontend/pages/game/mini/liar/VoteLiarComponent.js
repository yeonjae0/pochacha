import React from "react";


export default function VoteLiarComponent(){

    return (
        <div>
            <h1>누가 거짓말을 하고 있을까?</h1>
            {/* map 함수로 플레이어 수만큼 radio 버튼 생기도록 만들 것 */}
            {/* 후에 투표결과 어떻게 처리할 것인지 상의 해 볼 것 */}
            <form style={{display: 'flex', justifyContent: 'center'}}>
                <fieldset style={{width: '300px'}}>
                    <legend style={{backgroundColor: '#000', color: '#fff', padding: '3px 6px'}}>라이어라고 생각되는 사람에게 투표하세요</legend>
                    
                    <input style={{margin: '0.4rem'}} type="radio" id="kraken" name="monster" value="K" />
                    <label for="kraken">Kraken</label><br />

                    <input style={{margin: '0.4rem'}} type="radio" id="sasquatch" name="monster" value="S" />
                    <label for="sasquatch">Sasquatch</label><br />

                    <input style={{margin: '0.4rem'}} type="radio" id="mothman" name="monster" value="M" />
                    <label for="mothman">Mothman</label>
                </fieldset>
            </form>
        </div>
        )
}