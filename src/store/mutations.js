import i18n from '@/plugins/i18n'

export const setUserInfo = (state, userInfo) => {
    state.userInfo = userInfo;
};

export const setLang = (state, { language }) => {
    state.lang = language;
    localStorage.setItem('locale', language);
    i18n.global.locale = language;
}
