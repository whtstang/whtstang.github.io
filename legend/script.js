var config = {
    type: Phaser.AUTO,
    canvas: document.getElementById("losCanvas"),
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var map;
var cursors;
var player;
var wallet = 0;
var collect = 0;
var score = parseFloat(wallet).toFixed( 8 );
var scoreText;
var collectText;

function preload ()
{
    this.load.image('sats', '../legend/img/sat_small2.png');
    this.load.image('bitcoin', '../legend/img/bitcoin_small.png');
    this.load.image('torch', '../legend/img/lightning_torch2.png');
    this.load.image('flame', '../legend/img/lightning_flame2.png');
    this.load.image('laptop', '../legend/img/laptop_bitcoin.png');
    this.load.image('ledger', '../legend/img/trezor3.png');
    this.load.image('casa', '../legend/img/casanode.png');
    this.load.image('phone', '../legend/img/phone_small.png');
    this.load.image('paper', '../legend/img/paperwallet.png');
    this.load.image('tiles', '../legend/img/LOS1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.tilemapTiledJSON('map', '../legend/img/LOS_Maze.json');
    this.load.spritesheet('player', '../legend/img/hodlersheet.png', { frameWidth: 32, frameHeight: 52 });
}

function create ()
{
    // map data and layers
    var map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('LOS1', 'tiles');
    var backgroundlayer = map.createStaticLayer('Background', tileset, 0, 0);
    var blockedLayer = map.createStaticLayer('Blocked', tileset, 0, 0);
    blockedLayer.setCollisionByExclusion([-1]);
    
    //adding static groups for collectables

    var bitcoin = this.physics.add.staticGroup();
      bitcoin.create(2290, 6182, "bitcoin");
      
    var sats = this.physics.add.staticGroup();
      sats.create(1998, 1132, "sats");
      sats.create(1230, 1132, "sats");
      sats.create(1720, 5232, "sats");
      sats.create(1724, 3208, "sats");
      sats.create(62, 5020, "sats");
      sats.create(1154, 4942, "sats");
      sats.create(610, 4946, "sats");
      sats.create(910, 5790, "sats");
      sats.create(5056, 2986, "sats");
      sats.create(5461, 2757, "sats");
      sats.create(6138, 2062, "sats");
      sats.create(1726, 6222, "sats");
      sats.create(162, 5810, "sats");
      sats.create(3390, 3203, "sats");
      sats.create(3712, 3200, "sats");
      sats.create(4318, 4230, "sats");
      sats.create(5640, 5486, "sats");
      sats.create(1714, 994, "sats");
      sats.create(1730, 2110, "sats");
      sats.create(2000, 1962, "sats");
      sats.create(1226, 1956, "sats");

    var torch = this.physics.add.staticGroup();
      torch.create(2070, 6160, "torch");

    var flame = this.physics.add.staticGroup();
      flame.create(3080, 3105, "flame");
      flame.create(3380, 3105, "flame");
      
    var laptop = this.physics.add.staticGroup();
      laptop.create(5472, 2222, "laptop");

    var ledger = this.physics.add.staticGroup();
      ledger.create(3233, 2924, "ledger");

    var casa = this.physics.add.staticGroup();
      casa.create(6018, 5484, "casa");

    var phone = this.physics.add.staticGroup();
      phone.create(3646, 4302, "phone");

    var paper = this.physics.add.staticGroup();
      paper.create(1676, 4785, "paper");

  // spritesheet player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 17 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 27, end: 37}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 18, end: 26 }),
        frameRate: 10,
        repeat: -1
    });
    // Text settings
    scoreText = this.add.text(32, 10, 'bitcoin: 0', { fontSize: '26px', fill: '#ffffff' });
    collectText = this.add.text(32, 35, 'Collectables: 0', { fontSize: '26px', fill: '#ffffff' });
    //palyer sprite and start point 
    player = this.physics.add.sprite(3235, 3200, 'player', 0);
      

    // For player to collide with the map layer and select objects.
      this.physics.add.collider(player, blockedLayer);
      this.physics.add.collider(player, flame);
      //this.physics.add.collider(player, torches);
      //this.physics.add.collider(player, paperwallet);

      // For player to overlap with collectables 
      this.physics.add.overlap(player, bitcoin, collectBitcoin, null, this);
      this.physics.add.overlap(player, sats, collectSats, null, this);
      this.physics.add.overlap(player, ledger, collectLedger, null, this);
      this.physics.add.overlap(player, casa, collectCasa, null, this);
      this.physics.add.overlap(player, phone, collectPhone, null, this);
      this.physics.add.overlap(player, torch, collectTorch, null, this);
      this.physics.add.overlap(player, paper, collectPaper, null, this);
      this.physics.add.overlap(player, laptop, collectLaptop, null, this);

    /*this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);*/

      this.cameras.main.setBounds(0, 0, 3200 * 2, 3200 * 2);
      this.physics.world.setBounds(0, 0, 3200 * 2, 3200 * 2);
      this.cameras.main.startFollow(player, true, 0.05, 0.05);

    /*debugGraphics = this.add.graphics();

    this.input.keyboard.on('keydown_C', function (event) {
        showDebug = !showDebug;
        drawDebug();
    });*/

    cursors = this.input.keyboard.createCursorKeys();

    /*helpText = this.add.text(16, 16, getHelpMessage(), {
        fontSize: '18px',
        fill: '#ffffff'
    });

    helpText.setScrollFactor(0);*/
    scoreText.setScrollFactor(0);
    collectText.setScrollFactor(0);
}

function update (time, delta)
{
    player.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-300);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(300);
        player.anims.play('right', true);
    }
    // Vertical movement
    else if (cursors.up.isDown)
    {
        player.body.setVelocityY(-300);
        player.anims.play('up', true);
    }
    else if (cursors.down.isDown)
    {
        player.body.setVelocityY(300);
        player.anims.play('down', true);
    }
    else
    {
        player.anims.stop();
    }
    
}

// collect coins and collectables; increases score 
function collectBitcoin (player, bitcoin)
{
    bitcoin.disableBody(true, true);

    wallet += 1;
    scoreText.setText('bitcoin: ' + wallet.toFixed(8));
}

function collectSats(player, sats)
{
    sats.disableBody(true, true);

    wallet += 0.00000001;
    scoreText.setText('bitcoin: ' + wallet.toFixed(8));
}

function collectLedger(player, ledger)
{
    ledger.disableBody(true, true);

    collect += 1;
    collectText.setText('Collectables: ' + collect);
}

function collectCasa(player, casa)
{
    casa.disableBody(true, true);

    collect += 1;
    collectText.setText('Collectables: ' + collect);
}

function collectPhone(player, phone)
{
    phone.disableBody(true, true);

    collect += 1;
    collectText.setText('Collectables: ' + collect);
}

function collectPaper(player, paper)
{
    paper.disableBody(true, true);

    collect += 1;
    collectText.setText('Collectables: ' + collect);
}

function collectTorch(player, torch)
{
    torch.disableBody(true, true);

    collect += 1;
    collectText.setText('Collectables: ' + collect);
}

function collectLaptop(player, laptop)
{
    laptop.disableBody(true, true);

    collect += 1;
    collectText.setText('Collectables: ' + collect);
}




