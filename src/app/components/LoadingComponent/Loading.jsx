import React from 'react'
import './loading.css'

export default function Loading() {
    return (
        <>

            <div className="loading">
                <div className="main">
                    <div className="shadow-wrapper">
                        <div className="shadow" />
                    </div>
                    <div className="dragon">
                        <div className="body" />
                        <div className="horn-left" />
                        <div className="horn-right" />
                        <div className="eye left" />
                        <div className="eye right" />
                        <div className="blush left" />
                        <div className="blush right" />
                        <div className="mouth" />
                        <div className="tail-sting" />
                    </div>
                    <div className="fire-wrapper">
                        <div className="fire" />
                    </div>
                    <div className="progress">
                        <span>Loading...</span>
                        <div className="outer">
                            <div className="inner" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}






