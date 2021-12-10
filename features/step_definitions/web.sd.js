// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require('@cucumber/cucumber');
const YAML = require('yaml');

When(/^I go to "([^"]*)"$/, async function (url) {
    await browser.url(url);
});

When(/^I check the texts of the elements:$/, async function (table) {
    const rows = table.hashes()
    for (const row of rows) {
        expect(await $(row.selector).getText())
            .toEqual(row.text)
    }
});

When(/^I expect element: "([^"]*)" (text|value): "([^"]*)"$/, async function (selector, type, text) {
    const methods = {
        text: 'getText',
        value: 'getValue'
    }
    expect(await $(selector)[methods[type]]())
        .toEqual(text)
});

When(/^I go to "([^"]*)" menu item$/, async function (item) {
    await $(`//a[contains(.,"${item}")]`).click();
});

When(/^I fill form:$/, async function (formYaml) {
    const formData = YAML.parse(formYaml);
    for (const field in formData) {
        await $('#' + field).setValue(formData[field]);
    }
    await $('//button[contains(., "Create")]').click();
});

Then(/^I check email: "([^"]*)" of created user$/, async function (email) {
    const userRow = await $(`//*[text()="${email}"]/..`);
    expect(await userRow.$('(.//div[@class="tabulator-cell"])[1]').getText()).toEqual(email);
});

When(/^I login as: \"([^\"]*)\", \"([^\"]*)\"$/, async function (login, password) {
    await $('#login').setValue(login);
    await $('#password').setValue(password);
    await $('button').click();
    await $(`//a[@title="${login}"]`).waitForDisplayed();
});

Then(/^I get "([^"]*)" error message$/, async function (message) {
    expect(await $('#error').getText()).toEqual(message);
});