module.exports = function () {
  return {
    presets: [
      [
        require.resolve("@babel/preset-env"),
        {
          targets: { browsers: ["last 2 versions", "IE 10"] },
          modules: "auto",
        },
      ],
      require.resolve("@babel/preset-react"),
    ],
    plugins: [
      require.resolve("babel-plugin-react-require"),
      require.resolve("@babel/plugin-syntax-dynamic-import"),
      require.resolve("@babel/plugin-proposal-export-default-from"),
      require.resolve("@babel/plugin-proposal-export-namespace-from"),
      require.resolve("@babel/plugin-proposal-do-expressions"),
      require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
      require.resolve("@babel/plugin-proposal-optional-chaining"),
      [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
      [
        require.resolve("@babel/plugin-proposal-class-properties"),
        { loose: true },
      ],
    ],
  };
};
