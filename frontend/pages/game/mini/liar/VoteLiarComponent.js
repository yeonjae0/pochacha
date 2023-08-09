import React from "react";


export default function VoteLiarComponent({nicknames}){

    /* 임시의 플레이어 리스트 */
    console.log(nicknames);

    return (
        <div>
            <h1>누가 거짓말을 하고 있을까?</h1>
            <fieldset>
       { nicknames.map((nickname, i) => {
            return (
                <label key={nickname}>
                    <input
                        type="radio"
                        value={nickname}
                        name={nickname}
                        // defaultChecked={defaultChecked}
                        // disabled={disabled}
                    />
                    {nicknames[i]}
                    <br/>
                </label>
            )
          })
        }
        </fieldset>
        </div>
        )
}