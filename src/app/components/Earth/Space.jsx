import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import Earth from './Earth';
import Links from './LinkDot';
import { sLocation, sSelection } from '../../context/store';

export default function Space() {

    const data = sLocation.use();
    const DataSelection = sSelection.use();
    const radius = 4.3;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                padding: '0 auto',
            }}
        >
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 100px 40px #007bff80',
            }}>
            </div>
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 50px 25px #ffffff',
            }}>
            </div>
            {/* Change to your location */}
            <Canvas
                // camera={{ position: [-1.4707, 1.3922, -4.5715] }}
                camera={{
                    position: [
                        radius * Math.cos((parseFloat(data.lon ? data.lon : DataSelection.lon)) * Math.PI / 180),
                        radius * Math.tan((parseFloat(data.lat ? data.lat : DataSelection.lat)) * Math.PI / 180),
                        radius * Math.sin((parseFloat(data.lon ? data.lon : DataSelection.lon) + 180) * Math.PI / 180),
                    ]
                }}
                style={{
                    width: '800px',
                    height: '100vh',
                }}
            >

                <ambientLight intensity={0.9} />
                <directionalLight
                    position={[-radius, radius * Math.tan(-23.44 * Math.PI / 180), -radius]}
                    intensity={3}
                    color={'#fff'}
                    castShadow
                />

                <Earth radius={radius}/>
                <Links radius={radius}/>

                <OrbitControls
                    minDistance={10}
                    maxDistance={10}
                    enablePan={false}
                />
            </Canvas>
        </div>
    )
}
