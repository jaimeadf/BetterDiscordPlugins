import React from 'react';

import { BoundedBdApi } from '../environment';
import { useSettings } from '../stores/SettingsStore';

const { Webpack } = BdApi;
const { Filters } = Webpack;

const margins = BdApi.findModuleByProps('marginLarge');

const FormSection = Webpack.getModule(Filters.byStrings('.titleClassName', '.sectionTitle'), { searchExports: true });
const FormItem = Webpack.getModule(m => Filters.byStrings('.titleClassName', '.required')(m?.render), { searchExports: true });
const FormTitle = Webpack.getModule(Filters.byStrings('.faded', '.required'), { searchExports: true });
const FormText = Webpack.getModule(m => m?.Types?.INPUT_PLACEHOLDER, { searchExports: true });
const TextInput = Webpack.getModule(m => m?.defaultProps?.type === 'text', { searchExports: true });
const Slider = Webpack.getModule(Filters.byStrings('.asValueChanges'), { searchExports: true });
const SwitchItem = Webpack.getModule(Filters.byStrings('.tooltipNote'), { searchExports: true });

export function SettingsPanel() {
    const [
        settings,
        defaults,
        update
    ] = useSettings();

    function handlePixelMarkerRender(value) {
        return `${value}px`;
    }

    function handlePercentageMarkerRender(value) {
        return `${value.toFixed(2)}%`;
    }

    function handleThresholdMarkerRender(value) {
        if (value == 0) {
            return 'Off';
        }

        if (value >= 1000) {
            return `${value / 1000}k`;
        }

        return value;
    }

    return <>
        <FormSection>
            <FormTitle tag="h2">Appearance</FormTitle>

            <FormItem className={margins.marginBottom40}>
                <FormTitle>Maximum Avatars</FormTitle>
                <TextInput
                    type="number"
                    placeholder={defaults.max}
                    defaultValue={settings.max}
                    onChange={value => {
                        const number = parseInt(value);

                        if (number >= 1 && number <= 100) {
                            update('max', number);
                        } else {
                            BoundedBdApi.showToast('The value must be a number from 1 to 100.', 'danger');
                        }
                    }}
                />
                <FormText type={FormText.Types.DESCRIPTION}>
                    Sets the maximum number of avatars shown per emoji from 1 to
                    100.
                </FormText>
            </FormItem>

            <FormItem className={margins.marginBottom40}>
                <FormTitle className={margins.marginBottom20}>Avatar Size</FormTitle>
                <Slider
                    markers={[
                        8,
                        12,
                        16,
                        20,
                        24,
                        32
                    ]}
                    equidistant={true}
                    stickToMarkers={true}
                    defaultValue={defaults.avatarSize}
                    initialValue={settings.avatarSize}
                    onMarkerRender={handlePixelMarkerRender}
                    onValueChange={value => update('avatarSize', value)}
                />
                <FormText type={FormText.Types.DESCRIPTION}>
                    Sets the size of the avatars.
                </FormText>
            </FormItem>

            <FormItem className={margins.marginBottom40}>
                <FormTitle className={margins.marginBottom20}>Avatar Overlap</FormTitle>
                <Slider
                    markers={[
                        0,
                        100 / 8,
                        100 / 4,
                        100 / 3,
                        100 / 2
                    ]}
                    stickToMarkers={true}
                    defaultValue={defaults.avatarOverlap}
                    initialValue={settings.avatarOverlap}
                    onMarkerRender={handlePercentageMarkerRender}
                    onValueChange={value => update('avatarOverlap', value)}
                />
                <FormText type={FormText.Types.DESCRIPTION}>
                    Sets how much an avatar covers the previous one.
                </FormText>
            </FormItem>

            <FormItem className={margins.marginBottom40}>
                <FormTitle className={margins.marginBottom20}>Avatar Spacing</FormTitle>
                <Slider
                    markers={[
                        0,
                        100 / 48,
                        100 / 24,
                        100 / 16,
                        100 / 12,
                        100 / 8,
                        100 / 6,
                        100 / 4
                    ]}
                    stickToMarkers={true}
                    defaultValue={defaults.avatarSpacing}
                    initialValue={settings.avatarSpacing}
                    onMarkerRender={handlePercentageMarkerRender}
                    onValueChange={value => update('avatarSpacing', value)}
                />
                <FormText type={FormText.Types.DESCRIPTION}>
                    Sets the gap between two avatars.
                </FormText>
            </FormItem>
        </FormSection>

        <FormSection>
            <FormTitle tag="h2">Thresholds</FormTitle>

            <FormItem className={margins.marginBottom40}>
                <FormTitle className={margins.marginBottom20}>Emoji Threshold</FormTitle>
                <Slider
                    markers={[
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20
                    ]}
                    stickToMarkers={true}
                    defaultValue={defaults.emojiThreshold}
                    initialValue={settings.emojiThreshold}
                    onMarkerRender={handleThresholdMarkerRender}
                    onValueChange={value => update('emojiThreshold', value)}
                />
                <FormText type={FormText.Types.DESCRIPTION}>
                    Hides the reactors when the number of emojis exceeds the
                    threshold.
                </FormText>
            </FormItem>

            <FormItem className={margins.marginBottom40}>
                <FormTitle className={margins.marginBottom20}>Reactions Total Threshold</FormTitle>
                <Slider
                    markers={[
                        0,
                        10,
                        20,
                        50,
                        100,
                        500,
                        1000,
                        2000,
                        3000,
                        4000,
                        5000,
                        10000
                    ]}
                    equidistant={true}
                    stickToMarkers={true}
                    defaultValue={defaults.reactionsTotalThreshold}
                    initialValue={settings.reactionsTotalThreshold}
                    onMarkerRender={handleThresholdMarkerRender}
                    onValueChange={value => update('reactionsTotalThreshold', value)}
                />
                <FormText type={FormText.Types.DESCRIPTION}>
                    Hides the reactors when the sum of the number of reactions
                    in all emojis exceeds the threshold.
                </FormText>
            </FormItem>

            <FormItem className={margins.marginBottom40}>
                <FormTitle className={margins.marginBottom20}>Reactions per Emoji Threshold</FormTitle>
                <Slider
                    markers={[
                        0,
                        5,
                        10,
                        20,
                        50,
                        100,
                        200,
                        500
                    ]}
                    equidistant={true}
                    stickToMarkers={true}
                    defaultValue={defaults.reactionsPerEmojiThreshold}
                    initialValue={settings.reactionsPerEmojiThreshold}
                    onMarkerRender={handleThresholdMarkerRender}
                    onValueChange={value => update('reactionsPerEmojiThreshold', value)}
                />
                <FormText type={FormText.Types.DESCRIPTION}>
                    Hides the reactors when the number of reactions on a single
                    emoji exceeds the threshold.
                </FormText>
            </FormItem>
        </FormSection>

        <FormSection>
            <FormTitle tag="h2">Filters</FormTitle>

            <SwitchItem
                value={settings.hideSelf}
                onChange={checked => update('hideSelf', checked)}
            >
                Hide Self
            </SwitchItem>

            <SwitchItem
                value={settings.hideBots}
                onChange={checked => update('hideBots', checked)}
            >
                Hide Bots
            </SwitchItem>

            <SwitchItem
                value={settings.hideBlocked}
                onChange={checked => update('hideBlocked', checked)}
            >
                Hide Blocked Users
            </SwitchItem>
        </FormSection>
    </>;
}
