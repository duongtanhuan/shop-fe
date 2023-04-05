import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
export function TranslateHttpLoaderFactory(http: HttpClient) {
    const enLang = [
        {prefix: './assets/i18n/labels/', suffix: '.json'},
        {prefix: './assets/i18n/validators/', suffix: '.json'},
        {prefix: './assets/i18n/messages/', suffix: '.json'}
    ]

    return new MultiTranslateHttpLoader(http, enLang);
}