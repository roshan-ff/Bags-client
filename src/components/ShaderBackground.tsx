"use client";

import dynamic from "next/dynamic";
import React from "react";

const ShaderGradientCanvas = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradientCanvas),
  { ssr: false }
);

const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false }
);

export function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <ShaderGradient
          {...({
            animate: "on",
            brightness: 1.1,
            cAzimuthAngle: 180,
            cDistance: 3.9,
            cPolarAngle: 115,
            cameraZoom: 1,
            color1: "#f6f3ff",
            color2: "#ede9fe",
            color3: "#c7b7ff",
            envPreset: "city",
            fov: 45,
            frameRate: 10,
            gizmoHelper: "hide",
            grain: "off",
            lightType: "3d",
            pixelDensity: 1,
            positionX: -0.5,
            positionY: 0.1,
            positionZ: 0,
            range: "disabled",
            rangeEnd: 40,
            rangeStart: 0,
            reflection: 0.1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 235,
            shader: "defaults",
            type: "waterPlane",
            uAmplitude: 0,
            uDensity: 1.1,
            uFrequency: 5.5,
            uSpeed: 0.1,
            uStrength: 2.4,
            uTime: 0.2,
            wireframe: false,
          } as any)}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
