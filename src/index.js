const plugin = require('tailwindcss/plugin');

const objects = plugin(
    function ({addUtilities, theme, e}) {
        const objectPrefix = theme('objectPrefix');

        const stackSpacing = {
            ...theme('spacing'),
            ...theme('stackSpacing'),
        };

        addUtilities([
            {
                [`.${e(`${objectPrefix}stack`)} > *`]: {
                    marginTop: `${stackSpacing.DEFAULT}`
                },
                [`.${e(`${objectPrefix}stack`)} > *:first-child`]: {
                    marginTop: 0
                },
            },
            {
                [`.${e(`${objectPrefix}stack-none`)} > *`]: {
                    marginTop: 0
                },
            },
            ...Object.entries(stackSpacing).map(([key, value]) => {
                return {
                    [`.${e(`${objectPrefix}stack-${key}`)} > *`]: {
                        marginTop: `${value}`
                    },
                    [`.${e(`${objectPrefix}stack-${key}`)} > *:first-child`]: {
                        marginTop: 0
                    },
                }
            })
        ]);

        const inlineSpacing = {
            ...theme('spacing'),
            ...theme('inlineSpacing'),
        };

        addUtilities([
            {
                [`.${e(`${objectPrefix}inline`)}`]: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginTop: `-${inlineSpacing.DEFAULT}`,
                    marginLeft: `-${inlineSpacing.DEFAULT}`
                },
                [`.${e(`${objectPrefix}inline`)} > *`]: {
                    marginTop: `${inlineSpacing.DEFAULT}`,
                    marginLeft: `${inlineSpacing.DEFAULT}`
                },
            },
            {
                [`.${e(`${objectPrefix}inline-none`)}`]: {
                    marginTop: 0,
                    marginLeft: 0
                },
                [`.${e(`${objectPrefix}inline-none`)} > *`]: {
                    marginTop: 0,
                    marginLeft: 0
                },
            },
            ...Object.entries(inlineSpacing).flatMap(([key, value]) => {
                return [
                    {
                        [`.${e(`${objectPrefix}inline-${key}`)}`]: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginTop: `-${value}`,
                            marginLeft: `-${value}`
                        },
                        [`.${e(`${objectPrefix}inline-${key}`)} > *`]: {
                            marginTop: `${value}`,
                            marginLeft: `${value}`
                        },
                    },
                    ...Object.entries(inlineSpacing).map(([keyY, valueY]) => {
                        return {
                            [`.${e(`${objectPrefix}inline-${key}-${keyY}`)}`]: {
                                display: 'flex',
                                flexWrap: 'wrap',
                                marginTop: `-${valueY}`,
                                marginLeft: `-${value}`
                            },
                            [`.${e(`${objectPrefix}inline-${key}-${keyY}`)} > *`]: {
                                marginTop: `${valueY}`,
                                marginLeft: `${value}`
                            },
                        }
                    })
                ]
            })
        ]);

        const containerMaxWidth = {
            ...theme('maxWidth'),
            ...theme('containerMaxWidth'),
        };

        const containerSpacing = {
            ...theme('spacing'),
            ...theme('containerSpacing'),
        };

        addUtilities([
            {
                [`.${e(`${objectPrefix}container`)}`]: {
                    marginLeft: `${containerSpacing.DEFAULT}`,
                    marginRight: `${containerSpacing.DEFAULT}`,
                    maxWidth: `${containerMaxWidth.DEFAULT}`,
                    [`@media (min-width: calc(${containerMaxWidth.DEFAULT} + (2 * ${containerSpacing.DEFAULT})))`]: {
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    },
                },
            },
            {
                [`.${e(`${objectPrefix}container-none`)}`]: {
                    marginLeft: 0,
                    marginRight: 0,
                    maxWidth: `auto`,
                },
            },
            ...Object.entries(containerSpacing).flatMap(([key, value]) => {
                return [
                    {
                        [`.${e(`${objectPrefix}container-${key}`)}`]: {
                            marginLeft: `${value}`,
                            marginRight: `${value}`,
                            maxWidth: `${containerMaxWidth.DEFAULT}`,
                            [`@media (min-width: calc(${containerMaxWidth.DEFAULT} + (2 * ${value})))`]: {
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            },
                        },
                    },
                    ...Object.entries(containerMaxWidth).map(([containerKey, containerValue]) => {
                        return {
                            [`.${e(`${objectPrefix}container-${containerKey}-${key}`)}`]: {
                                marginLeft: `${value}`,
                                marginRight: `${value}`,
                                maxWidth: `${containerValue}`,
                                [`@media (min-width: calc(${containerValue} + (2 * ${value})))`]: {
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                },
                            },
                        };
                    })
                ];
            })
        ]);

        addUtilities([
            {
                [`.${e(`${objectPrefix}bleed`)}`]: {
                    marginLeft: `50%`,
                    transform: `translateX(-50%)`,
                    width: `100vw`,
                },
            },
            {
                [`.${e(`${objectPrefix}bleed-none`)}`]: {
                    marginLeft: `0`,
                    transform: `none`,
                    width: `auto`,
                },
            },
        ]);
    },
    {
        theme: {
            objectPrefix: 'o-',
            containerMaxWidth: {
                DEFAULT: '1380px',
            },
            containerSpacing: {
                DEFAULT: '1rem',
            },
            stackSpacing: {
                DEFAULT: '1rem',
            },
            inlineSpacing: {
                DEFAULT: '1rem',
            },
        },
    },
)
module.exports = objects
