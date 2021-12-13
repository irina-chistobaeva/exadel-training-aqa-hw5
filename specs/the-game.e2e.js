describe('The game', function () {
    it('should get more than 100 points ', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/arkanoid.html');
        await browser.pause(1000);
        await $('button=PLAY').click();
        await browser.waitUntil(async () => {
            let ballLocation;
            let padLocation;

            do {
                ballLocation = await $('#ball').getLocation('x');
                padLocation = await $('#pad').getLocation('x');
                await browser.keys(['D']);
            } while (ballLocation > padLocation);

            do {
                ballLocation = await $('#ball').getLocation('x');
                padLocation = await $('#pad').getLocation('x');
                await browser.keys(['A']);
            } while (ballLocation < padLocation);

            console.log(ballLocation);
            console.log(padLocation);
            const points = parseInt(await $('#points').getText(), 10);
            if (points > 100) return true
            console.log({ points })
        }, { timeout: 60000, interval: 10 })
    });
})
