import React from 'react'
import ReactSpeedometer from "react-d3-speedometer"

function SignalMeterLayout(props) {
    return (
        <>
            <ReactSpeedometer
                width={props.width}
                needleHeightRatio={0.7}
                value={(props.signal + 2)*200 + 100}
                currentValueText={props.strategy}
                customSegmentLabels={[
                {
                    text: 'Definite Sell',
                    position: 'INSIDE',
                    color: '#555',
                },
                {
                    text: 'Sell',
                    position: 'INSIDE',
                    color: '#555',
                },
                {
                    text: 'Keep',
                    position: 'INSIDE',
                    color: '#555',
                    fontSize: '19px',
                },
                {
                    text: 'Buy',
                    position: 'INSIDE',
                    color: '#555',
                },
                {
                    text: 'Definite Buy',
                    position: 'INSIDE',
                    color: '#555',
                },
                ]}
                ringWidth={47}
                needleTransitionDuration={3333}
                needleTransition="easeElastic"
                needleColor={'#1A2A38'}
                textColor={props.textColor}
            />
        </>
    )
}

export default SignalMeterLayout;