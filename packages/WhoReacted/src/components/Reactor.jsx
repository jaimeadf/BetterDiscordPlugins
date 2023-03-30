import React from 'react';

export function Reactor({ user, guildId, size }) {
    return (
        <img
            className="bd-who-reacted__reactor-avatar"
            width={size}
            height={size}
            src={user.getAvatarURL(guildId, size)}
        />
    );
}

export function MaskedReactor({ user, guildId, size, overlap, spacing }) {
    const proportionalInnerRadius = 1 / 2;
    const proportionalOuterRadius = proportionalInnerRadius + spacing;

    const absoluteOffset = (overlap - spacing) * size;

    return (
        <svg style={{ marginRight: `-${absoluteOffset}px` }} width={size} height={size}>
            <defs>
                <mask id="bd-who-reacted-reactor-mask" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
                    <rect fill="white" width="1" height="1" />
                    <circle
                        fill="black"
                        cx={2 * proportionalInnerRadius + proportionalOuterRadius - overlap}
                        cy="0.5"
                        r={proportionalOuterRadius}
                    />
                </mask>
            </defs>

            <foreignObject width="100%" height="100%" mask="url(#bd-who-reacted-reactor-mask)">
                <Reactor size={size} user={user} guildId={guildId} />
            </foreignObject>
        </svg>
    );
}
