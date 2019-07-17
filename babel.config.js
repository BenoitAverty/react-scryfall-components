module.exports = {
    presets: [
        ['@babel/preset-env',
            {
                "targets": {
                    "node": 10
                }
            },
        ],
        '@babel/preset-react'],
    plugins: [
        'emotion',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
    ],
};
