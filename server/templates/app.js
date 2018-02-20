import {template} from 'lodash';

const CSS_TEMPLATE = template(`<link rel="stylesheet" type="text/css" href="<%= css %>"/>`);
const JS_TEMPLATE = template(`<script src="<%= js %>"></script>`);
export default template(`
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <%= _.get(assets, 'main.css', []).map((css) => CSS_TEMPLATE({css})).join('') %>
            </head>
        <body>
            <div id="app"><%= renderedAppString %></div>
            <%= _.get(assets, 'vendor.js', []).map((js) => JS_TEMPLATE({js})).join('') %>
            <%= _.get(assets, 'main.js', []).map((js) => JS_TEMPLATE({js})).join('') %>
        </body>
    </html>
`, {
    imports: {
        CSS_TEMPLATE,
        JS_TEMPLATE,
        //for webpack dev server
        assets: {},
        renderedAppString: ''
    }
});
