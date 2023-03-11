//
// This source file is part of the current-contracts open source project
// Copyright 2023 KontrolSoft Yazılım A.Ş.
// Licensed under Apache License v2.0
//
let assertRevert = require('./helpers/AssertRevert');

const constants = require('./constants.js');
const RebirthToken = artifacts.require("../contracts/RebirthToken.sol");
var BigNumber = web3.utils.BN;
var fixNumber = function(n){
    return new BigNumber(n).toString() * 1;
};

contract('RebirthToken', (accounts) => {
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    
    let RebirthTokenInstance;
    beforeEach(async () => {
        RebirthTokenInstance = await RebirthToken.deployed();
    });

    describe('standard tests',function(){
        it('should put 1.000.000.000 RebirthToken in the first account', async () => {
            const balance = await RebirthTokenInstance.balanceOf.call(accounts[0]);
            
            assert.equal(balance.valueOf(), 1000000000e18, "1000000000 wasn't in the first account");
        });
        it('returns the total amount of tokens', async function () {
            const totalSupply = await RebirthTokenInstance.totalSupply();
    
            assert.equal(totalSupply, 1000000000e18);
        });

        describe('when the recipient is the zero address', function () {
			const to = ZERO_ADDRESS;
            const owner = accounts[0];

			it('reverts', async function () {
				await assertRevert(RebirthTokenInstance.transfer(to, 100, { from: owner }));
			});
		});
    });

    describe('get distributable amount', function () {
        it('returns the remaining supply allocated to the Seed.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(1);
            assert.equal(getSupply,constants.seedTotal);
        });
        it('returns the remaining supply allocated to the Private I.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(2);
            assert.equal(getSupply,constants.privateITotal);
        });
        it('returns the remaining supply allocated to the Private II.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(3);
            assert.equal(getSupply,constants.privateIITotal);
        });
        it('returns the remaining supply allocated to the Private III.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(4);
            assert.equal(getSupply,constants.privateIIITotal);
        });
        it('returns the remaining supply allocated to the Rewards.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(5);
            assert.equal(getSupply,constants.rewardsTotal);
        });
        it('returns the remaining supply allocated to the Advisors, Legal & PR.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(6);
            assert.equal(getSupply,constants.advisorsTotal);
        });
        it('returns the remaining supply allocated to the Community Building & Airdrop Campaigns.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(7);
            assert.equal(getSupply,constants.communityTotal);
        });
        it('returns the remaining supply allocated to the Exchanges & Market Making.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(8);
            assert.equal(getSupply,constants.exchangesTotal);
        });
        it('returns the remaining supply allocated to the Founder & Team.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(9);
            assert.equal(getSupply,constants.teamTotal);
        });
        it('returns the remaining supply allocated to the Overdraft Funding Reserves.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(10);
            assert.equal(getSupply,constants.reservesTotal);
        });
        it('returns the remaining supply allocated to the Investors.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(11);
            assert.equal(getSupply,constants.investorsTotal);
        });
        it('returns the remaining supply allocated to the TGE.', async function () {
            const getSupply = await RebirthTokenInstance.getDistributableAmount(12);
            assert.equal(getSupply,constants.tgeTotal);
        });
    });

    describe('distribute token', function(){
        it('should distribute the token reserved for the Seed allocation',  async function () {
            //Setup sample seed contract
            const testAccount = accounts[1];

            // Get initial balances of second account.
            const testAccountStartingBalance = (await RebirthTokenInstance.balanceOf.call(testAccount));

            // Get initial supply of Seed Allocation
            const getInitialSupply = await RebirthTokenInstance.getDistributableAmount(1);

            // Distribute Token
            await RebirthTokenInstance.distributeToken(1, testAccount, 0);

            // Get balances of second account after the transactions.
            const testAccountEndingBalance = (await RebirthTokenInstance.balanceOf.call(testAccount));

            // Calculate the amount of tokens distributed in account two
            const calcDistributed = testAccountEndingBalance - testAccountStartingBalance;

            // Get new supply of Seed Allocation
            const getNewSupply = await RebirthTokenInstance.getDistributableAmount(1);

            assert.equal(calcDistributed, fixNumber(getInitialSupply),"The amount distributed is not equal to the amount expected to be distributed.");
            assert.equal(0, fixNumber(getNewSupply),"The new supply amount of the distributed allocation is not equal to zero.");
        });
        it('should distribute the token reserved for the Private I allocation',  async function () {
            //Setup sample Private I contract
            const testAccount = accounts[2];

            // Get initial balances of account.
            const testAccountStartingBalance = (await RebirthTokenInstance.balanceOf.call(testAccount));

            // Get initial supply of Private I Allocation
            const getInitialSupply = await RebirthTokenInstance.getDistributableAmount(2);

            // Distribute Token
            await RebirthTokenInstance.distributeToken(2, testAccount, constants.privateITotal);

            // Get balances of second account after the transactions.
            const testAccountEndingBalance = (await RebirthTokenInstance.balanceOf.call(testAccount));

            // Calculate the amount of tokens distributed in account two
            const calcDistributed = testAccountEndingBalance - testAccountStartingBalance;

            // Get new supply of Seed Allocation
            const getNewSupply = await RebirthTokenInstance.getDistributableAmount(2);

            assert.equal(calcDistributed, fixNumber(getInitialSupply),"The amount distributed is not equal to the amount expected to be distributed.");
            assert.equal(0, fixNumber(getNewSupply),"The new supply amount of the distributed allocation is not equal to zero.");
        });
        it('should distribute the token reserved for the Private II allocation',  async function () {
            //Setup sample Private II contract
            const testAccount = accounts[3];

            // Get initial balances of account.
            const testAccountStartingBalance = (await RebirthTokenInstance.balanceOf.call(testAccount));

            // Get initial supply of Private I Allocation
            const getInitialSupply = await RebirthTokenInstance.getDistributableAmount(3);

            // Distribute Token
            await RebirthTokenInstance.distributeToken(3, testAccount, constants.sixteenMillion);

            // Get balances of second account after the transactions.
            const testAccountEndingBalance = (await RebirthTokenInstance.balanceOf.call(testAccount));

            // Calculate the amount of tokens distributed in account two
            const calcDistributed = testAccountEndingBalance - testAccountStartingBalance;

            // Get new supply of Seed Allocation
            const getNewSupply = await RebirthTokenInstance.getDistributableAmount(3);

            assert.equal(calcDistributed, constants.sixteenMillion,"The amount distributed is not equal to the amount expected to be distributed.");
            assert.equal((getInitialSupply - constants.sixteenMillion), fixNumber(getNewSupply),"The new supply amount of the distributed allocation is not equal to zero.");
        });
    });

    it("should transfer tokens between accounts", async () => {
        const fromAccount = accounts[0];
        const toAccount = accounts[1];
        const amount = 100;

        // Get initial balances
        const fromBalance = await RebirthTokenInstance.balanceOf(fromAccount);
        const toBalance = await RebirthTokenInstance.balanceOf(toAccount);

        // Transfer tokens from 'fromAccount' to 'toAccount'
        await RebirthTokenInstance.transfer(toAccount, amount, { from: fromAccount });

        // Check if the balances have been updated
        const newFromBalance = await RebirthTokenInstance.balanceOf(fromAccount);
        const newToBalance = await RebirthTokenInstance.balanceOf(toAccount);

        assert.equal(fixNumber(newFromBalance), fixNumber(fromBalance) - amount, "Amount wasn't deducted from the sender account");
        assert.equal(fixNumber(newToBalance), fixNumber(toBalance) + amount, "Amount wasn't added to the receiver account");
    });

    describe('transferERC20Token', function () {
        it('withdraw mistakenly sent tokens from the contract', async function () {
            const owner = accounts[0];
            const recipient = accounts[4];

            let balance = await RebirthTokenInstance.balanceOf(RebirthTokenInstance.address);
            assert.equal(fixNumber(balance), 0, 'Inititally the contract should not have any tokens');
            await RebirthTokenInstance.transfer(RebirthTokenInstance.address, 10, { from: owner });

            balance = await RebirthTokenInstance.balanceOf(RebirthTokenInstance.address);
            assert.equal(fixNumber(balance), 10, 'Contract was supposed to receive 10 tokens');

            let recipientBalance = await RebirthTokenInstance.balanceOf(recipient);
            assert.equal(fixNumber(recipientBalance), 0, 'Inititally the recipient should not have any tokens');

            await RebirthTokenInstance.transferERC20Token(RebirthTokenInstance.address, recipient, 10);
            recipientBalance = await RebirthTokenInstance.balanceOf(recipient);
            assert.equal(fixNumber(recipientBalance), 10, 'The recipient was supposed to receive 10 tokens');

            balance = await RebirthTokenInstance.balanceOf(RebirthTokenInstance.address);
            assert.equal(fixNumber(balance), 0, 'The contract should not have any tokens anymore');
        });	
    });

    describe('approve', function () {
		describe('when the spender is not the zero address', function () {
            const owner = accounts[0];
			const spender = accounts[4];

			describe('when the sender has enough balance', function () {
				const amount = 100;

				describe('when there was no approved amount before', function () {
					it('approves the requested amount', async function () {
						await RebirthTokenInstance.approve(spender, amount, { from: owner });

						const allowance = await RebirthTokenInstance.allowance(owner, spender);
						assert.equal(allowance, amount);
					});
				});

				describe('when the spender had an approved amount', function () {
					beforeEach(async function () {
						await RebirthTokenInstance.approve(spender, 1, { from: owner });
					});

					it('approves the requested amount and replaces the previous one', async function () {
						await RebirthTokenInstance.approve(spender, amount, { from: owner });

						const allowance = await RebirthTokenInstance.allowance(owner, spender);
						assert.equal(allowance, amount);
					});
				});
			});

			describe('when the sender does not have enough balance', function () {
				const amount = 101;

				describe('when there was no approved amount before', function () {
					it('approves the requested amount', async function () {
						await RebirthTokenInstance.approve(spender, amount, { from: owner });

						const allowance = await RebirthTokenInstance.allowance(owner, spender);
						assert.equal(allowance, amount);
					});
				});

				describe('when the spender had an approved amount', function () {
					beforeEach(async function () {
						await RebirthTokenInstance.approve(spender, 1, { from: owner });
					});

					it('approves the requested amount and replaces the previous one', async function () {
						await RebirthTokenInstance.approve(spender, amount, { from: owner });

						const allowance = await RebirthTokenInstance.allowance(owner, spender);
						assert.equal(allowance, amount);
					});
				});
			});
		});
	});

    describe('transfer from', function () {
		const owner = accounts[0];
		const spender = accounts[5];
		describe('when the recipient is not the zero address', function () {
			const to = accounts[6];

			describe('when the spender has enough approved balance', function () {
				beforeEach(async function () {
					await RebirthTokenInstance.approve(spender, 50, { from: owner });
				});

				describe('when the owner has enough balance',function () {
					const amount = 50;

					it('transfers the requested amount', async function () {
						await RebirthTokenInstance.transferFrom(owner, to, amount, { from: spender });

						const recipientBalance = await RebirthTokenInstance.balanceOf(to);
						assert.equal(recipientBalance, amount);
					});

					it('decreases the spender allowance', async function () {
						await RebirthTokenInstance.transferFrom(owner, to, amount, { from: spender });

						const allowance = await RebirthTokenInstance.allowance(owner, spender);
						assert.equal(allowance.eq(0),0);
					});
				});

				describe('when the owner does not have enough balance', function () {
					const amount = 101;

					it('reverts', async function () {
						await assertRevert(RebirthTokenInstance.transferFrom(owner, to, amount, { from: spender }));
					});
				});
			});

			describe('when the spender does not have enough approved balance', function () {
				beforeEach(async function () {
					await RebirthTokenInstance.approve(spender, 99, { from: owner });
				});

				describe('when the owner has enough balance', function () {
					const amount = 100;

					it('reverts', async function () {
						await assertRevert(RebirthTokenInstance.transferFrom(owner, to, amount, { from: spender }));
					});
				});

				describe('when the owner does not have enough balance', function () {
					const amount = 101;

					it('reverts', async function () {
						await assertRevert(RebirthTokenInstance.transferFrom(owner, to, amount, { from: spender }));
					});
				});
			});
		});

        describe('when the recipient is the zero address', function () {
			const amount = 100;
			const to = ZERO_ADDRESS;

			beforeEach(async function () {
				await RebirthTokenInstance.approve(spender, amount, { from: owner });
			});

			it('reverts', async function () {
				await assertRevert(RebirthTokenInstance.transferFrom(owner, to, amount, { from: spender }));
			});
		});
	});
});
