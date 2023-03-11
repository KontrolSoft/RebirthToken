//
// This source file is part of the current-contracts open source project
// Copyright 2023 KontrolSoft Yazılım A.Ş.
// Licensed under Apache License v2.0
//
var BigNumber = web3.utils.BN;

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}


/** Addresses **/
define('owner', '0x97f3ce9B8eE816FE4b947f38A8BfD568dacc035C');
define('investor', '0x616043a33cF7B8088d08eae9dB056e485b058aFb');


/** Alocations **/

let stringDecimals = '000000000000000000';


define('sixteenMillion', new BigNumber('16000000' + stringDecimals).toString());
define('seedTotal', new BigNumber('53000000' + stringDecimals).toString());
define('privateITotal', new BigNumber('30000000' + stringDecimals).toString());
define('privateIITotal', new BigNumber('36000000' + stringDecimals).toString());
define('privateIIITotal', new BigNumber('36000000' + stringDecimals).toString());
define('rewardsTotal', new BigNumber('47500000' + stringDecimals).toString());
define('advisorsTotal', new BigNumber('52500000' + stringDecimals).toString());
define('communityTotal', new BigNumber('60000000' + stringDecimals).toString());
define('exchangesTotal', new BigNumber('80000000' + stringDecimals).toString());
define('teamTotal', new BigNumber('140000000' + stringDecimals).toString());
define('reservesTotal', new BigNumber('250000000' + stringDecimals).toString());
define('investorsTotal', new BigNumber('215000000' + stringDecimals).toString());
define('tgeTotal', new BigNumber('30000000' + stringDecimals).toString());
