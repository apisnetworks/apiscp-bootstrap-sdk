# apnscp CSS Kit

apnscp Bootstrap SDK is a kit to build CSS for apnscp. The SDK relies on Bootstrap 4, which is mated to this repository (and panel). As of now, the current version is **4.0.0-alpha.6**.

[Node LTS](https://nodejs.org/en/download/) (6.10) is recommended.

## Getting Started

```shell
git clone https://github.com/apisnetworks/apnscp-bootstrap-sdk.git
cd apnscp-bootstrap-sdk
npm install
```



## Editing Themes

Themes are available under `scss/themes/themename.scss`. Basic tunables + addins should be located under `scss/themes/<themename>/`.



## Specifying Output

Use the environment variable `THEME` to force an output file (default: apnscp.css), `APNSCP_PATH` is the assumed location of apnscp, if making changes to a live panel; and `THEME_PATH` is the location for CSS themes in apnscp, usually public/css/themes/.

```bash
env THEME=mytheme grunt dist
```

Compiled CSS will be spit out to `dist/css/mytheme.css`.



## Building On-the-fly

SDK makes use of [grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch) to rebuild whenever a watched file is changed. Simply run `grunt watch` from the command-line.



## Enabling in apnscp

apnscp must be configured with **[style]** => **allow_custom** set to true on config.ini. Once enabled, users will have the option to configure 1 theme to their account. If Global Preferences (todo) are enabled on the account, then this theme may optionally apply to all users on the account.

Once enabled, visit **Account** > **Settings** > **Theme**. Select Custom from **Active Theme** to enter the custom theme dialog. Once installed, click **Save Changes**. Note the theme may only be overwritten and no more than 1 theme per user may exist at this time.



***Happy theming!***