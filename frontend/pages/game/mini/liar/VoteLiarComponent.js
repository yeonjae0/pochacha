import React from "react";


export default function VoteLiarComponent(){

    return (
        <div>
            <h1>누가 거짓말을 하고 있을까?</h1>
            <form>
                <fieldset>
                    <legend>Choose your favorite monster</legend>
                    
                    <input type="radio" id="kraken" name="monster" value="K" />
                    <label for="kraken">Kraken</label><br />

                    <input type="radio" id="sasquatch" name="monster" value="S" />
                    <label for="sasquatch">Sasquatch</label><br />

                    <input type="radio" id="mothman" name="monster" value="M" />
                    <label for="mothman">Mothman</label>
                </fieldset>
            </form>
        </div>
        )
}