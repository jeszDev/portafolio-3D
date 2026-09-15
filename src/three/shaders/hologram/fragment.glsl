#include ../includes/avatar-progress/fragment.glsl;

varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vPosition;

uniform vec3 uColor;
uniform vec3 uHeadColor;
uniform float uTime;

#define LINE_WIDTH 0.003
#define FADE_WIDTH 0.02

float hash11(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

float hash21(vec2 p) {
    p = fract(p * vec2(0.1031, 0.1030));
    p += dot(p, p.yx + 33.33);
    return fract((p.x + p.y) * p.x);
}

void main() {
    vec3 normal = normalize(vNormal);

    if(!gl_FrontFacing)
        normal *= -1.0;
    
    float progress = 1.0 - getProgress();

    float colScale = 24.0;
    float colId = floor(vPosition.x * colScale + vPosition.z * 12.0);

    float colSpeed = 1.6 + hash11(colId) * 1.8;
    float colOffset = hash11(colId + 42.17) * 20.0;

    float cycleHeight = 3.5 + hash11(colId + 9.8) * 3.0;
    float fallPos = vPosition.y * 10.0 + uTime * colSpeed + colOffset;
    float dropPhase = mod(fallPos, cycleHeight);
    float normTrail = dropPhase / cycleHeight;

    float dropTrail = pow(normTrail, 3.2);
    float headGlow = smoothstep(0.92, 1.0, normTrail);

    float cellY = floor(vPosition.y * 28.0);
    float charChangeTime = floor(uTime * 7.0);
    float charNoise = hash21(vec2(colId, cellY + charChangeTime));
    float charGlyph = step(0.25, charNoise);
    float flicker = 0.75 + 0.25 * sin(uTime * 14.0 + colId * 3.0);

    float codeFall =  dropTrail * charGlyph * flicker;

    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.2);
    float falloff = smoothstep(0.85, 0.35, fresnel);

    float effect = codeFall * 1.6 + headGlow * 2.2;
    effect += fresnel * 0.9;
    effect *= falloff;

    float dist = abs(vModelProgress - uProgress);
    float lineStrength = 1.0 - smoothstep(LINE_WIDTH - FADE_WIDTH, LINE_WIDTH + FADE_WIDTH, dist);
    effect += lineStrength * 2.5;
    
    if(!gl_FrontFacing)
        effect *= 0.35;

    vec3 finalColor = mix(uColor, uHeadColor, clamp(headGlow * 0.9 + lineStrength * 0.7, 0.0, 1.0));

    gl_FragColor = vec4(finalColor, min(effect * progress, 1.0));
}