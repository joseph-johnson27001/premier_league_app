module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.football-data.org/v4",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        headers: {
          "X-Auth-Token": "0aedec9ccc82483381b95b393f8c2df3", // Replace with your actual API token
        },
      },
    },
  },
};
