uniform vec3 uSurfaceColour;
uniform vec3 uDepthColour;

varying float vElevation;
varying vec2 vUv;

void main() {
    vec3 colour = mix(uDepthColour, uSurfaceColour, vElevation * 1.4);
    gl_FragColor = vec4(colour, 1.);
}