module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "rules": {
        "camelcase": "off",
        "no-tabs": 0,
        "smarttabs": 0,
        "indent": ["error", 4],
        "handle-callback-err": [2, "^.+Error$"]
    }
};