await page.click('a[class="r-111h2gw r-1loqt21 r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-3s2u2q r-qvutc0 css-4rbku5 css-18t94o4 css-901oao"]')
await page.waitFor(2000)
await page.click('div[data-testid="retweet"]') //retweet button
await page.waitFor(2000);
await page.click('div[data-testid="retweetConfirm"]') //retweetConfirm button
await page.waitFor(2000);
await page.goBack()