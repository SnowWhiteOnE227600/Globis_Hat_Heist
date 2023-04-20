kaboom();

  loadSprite("Snowblock", "/assets/Snowblock.png")
  loadSprite("swissmap", "/assets/swissmap.png")
  loadSprite("level_point", "/assets/level_point.png")
  loadSprite("level_point2", "/assets/level_point2.png")
  loadSprite("level_point_complete", "/assets/level_point_complete.png")
  loadSprite("level_point_complete2", "/assets/level_point_complete2.png")
  loadSprite("grass", "/assets/grass.jpg")
  loadSprite("Wallis", "/assets/Wallis.png")
  loadSprite("Basel", "/assets/Basel.png")
  loadSprite("Bern", "/assets/Bern.png")
  loadSprite("bossbackground", "/assets/bossbackground.png")
  loadSprite("title_screen", "/assets/Globi_titlescreen.png")
  loadSprite("end_screen", "/assets/end_screen.png")
  loadSprite("border", "/assets/border.png")
  loadSprite("Frenchwine", "/assets/Frenchwine.png")
  loadSprite("Grassblock", "/assets/Grassblock.png")
  loadSprite("Gravelblock", "/assets/Gravelblock.png")
  loadSound("Level", "/assets/Level.mp3")
  loadSound("Bosssong", "/assets/Bosssong.mp3")
  loadSound("Globisound", "/assets/Globisound.mp3")
  loadSprite("door", "/assets/door.png")
  loadSprite("How_to", "/assets/globi_key_binds.png")
  loadSprite("hat", "/assets/hat.png")
  loadSprite("Win", "/assets/Win.png")
  loadSprite("credits", "/assets/credits.png")


  loadSprite("Globi", "/assets/spritesheet.png", {
    sliceX: 14,
    sliceY: 1,
    anims: {
      run: {
        from: 1,
        to: 8,
        loop: true
      },
      idle: {
        from: 0,
        to: 0,
        loop: true
      },
      jump: {
        from: 7,
        to: 7,
        loop: true
      }
    }
  });

loadSprite("French", "/assets/Frenchsprite.png", {
  sliceX: 14,
  sliceY: 1,
  anims: {
    run: {
      from: 0,
      to: 8,
      loop: true
    },
    die: {
      from: 8,
      to: 13,
      loop: false
    },
  }
});

loadSprite("Boss", "/assets/boss.png", {
  sliceX: 4,
  sliceY: 1,
  anims: {
    run: {
      from: 0,
      to: 3,
      loop: true
    },
  }
});

function patrol(speed = 60, dir = 1) {
  return {
    id: "patrol",
    require: [ "pos", "area", ],
    add() {
      this.on("collide", (obj, col) => {
        if (col.isLeft() || col.isRight()) {
          dir = -dir
        }
      })
    },
    update() {
      this.move(speed * dir, 0)
    },
  }
}

  scene("Title_screen", ({ levelIdx}) => {
    const LEVELS = [
      [
        "*                  ",
        "                   ",
        "                   ",
        "                   ",


      ],
    ]
    const level = addLevel(LEVELS[levelIdx || 0], {
      width: 64,
      height: 89,
      pos: vec2(100, 200),

      "*": () => [
        sprite("title_screen"),
        area(),
        origin("bot"),
        "title_screen",
        scale(width() / 1900),
        pos(540, 525),
        z(1),
      ],

    })

    onKeyPress("space", () => {
      go("How_to", {
        levelIdx: 0,
      })
    })
  })

scene("How_to", ({ levelIdx}) => {
  const LEVELS = [
    [
      "*                  ",
      "                   ",
      "                   ",
      "                   ",


    ],
  ]
  const level = addLevel(LEVELS[levelIdx || 0], {
    width: 64,
    height: 89,
    pos: vec2(100, 200),

    "*": () => [
      sprite("How_to"),
      area(),
      origin("bot"),
      "title_screen",
      scale(width() / 3200),
      pos(540, 525),
      z(1),
    ],

  })

  onKeyPress("space", () => {
    go("Map", {
      levelIdx: 0,
    })
  })
})

  scene("Map", ({ levelIdx}) => {

    add([
      pos(0, 0),
      rect(5000, 5000),
      area(),
    ])

    const LEVELS = [
      [
        " #                 ",
        "                   ",
        "        *          ",
        "       $           ",
        "                   ",
        "                   ",
        "       @           ",
        "                   ",
        "                   ",
      ],
    ]

    const level = addLevel(LEVELS[levelIdx || 0], {
      width: 64,
      height: 89,
      pos: vec2(100, 200),

      "@": () => [
        sprite("level_point"),
        area(),
        origin("bot"),
        "level_point",
        scale (width()/3000),
        pos(-20, -115),
        z(2),
        area({width: 120,}),
      ],

      "#": () => [
        sprite("Globi"),
        area({width: 40,}),
        origin("bot"),
        "Globi",
        z(3),
        solid()
      ],

      "*": () => [
        sprite("swissmap"),
        origin("center"),
        "swissmap",
        scale (width()/2000),
        z(1),
        pos(0, -35),
      ],

      "$": () => [
        sprite("grass"),
        origin("center"),
        "swissmap",
        scale (width()/1000),
      ],

    })

    add([
      pos(-20, 0),
      rect(20, 1000),
      area(),
      solid(),
    ])
    add([
      pos(0, -40),
      rect(2000, 20),
      area(),
      solid(),
    ])
    add([
      pos(0, 710),
      rect(2000, 20),
      area(),
      solid(),
    ])
    add([
      pos(1263, 0),
      rect(20, 1000),
      area(),
      solid(),
    ])

    const Globi = get("Globi")[0]

    const SPEED = 300;


    onKeyDown("w", () => {
      Globi.move(0, -SPEED)
      if (Globi.curAnim() !== "run") {
        Globi.play("run")
      }
    })

    onKeyDown("a", () => {
      Globi.move(-SPEED, 0)
      Globi.flipX(true)
      if (Globi.curAnim() !== "run") {
        Globi.play("run")
      }
    })

    onKeyDown("s", () => {
      Globi.move(0, SPEED)
      if (Globi.curAnim() !== "run") {
        Globi.play("run")
      }
    })

    onKeyDown("d", () => {
      Globi.move(SPEED, 0)
      Globi.flipX(false)
      if (Globi.curAnim() !== "run") {
        Globi.play("run")
      }
    })

    onKeyRelease(["w", "a", "s", "d"], () => {
      if (Globi, !isKeyDown("a") && !isKeyDown("d")) {
        Globi.play("idle")
      }

    })
    Globi.onCollide("level_point", () => {
      go("Level_1", {
        levelIdx: 0,
      })
    })

  })

scene("Map2", ({ levelIdx}) => {

  add([
    pos(0, 0),
    rect(5000, 5000),
    area(),
  ])

  const LEVELS = [
    [
      "#                  ",
      "                   ",
      "   @    *          ",
      "       $           ",
      "                   ",
      "                   ",
      "       +           ",
      "                   ",
      "                   ",
    ],
  ]

  const level = addLevel(LEVELS[levelIdx || 0], {
    width: 64,
    height: 89,
    pos: vec2(100, 200),

    "+": () => [
      sprite("level_point_complete"),
      area(),
      origin("bot"),
      "level_point_complete",
      scale (width()/3000),
      pos(-20, -115),
      z(2),
      area({width: 120,}),
    ],

    "@": () => [
      sprite("level_point"),
      area(),
      origin("bot"),
      "level_point",
      scale (width()/3000),
      pos(240, -210),
      z(2),
      area({width: 120,}),
    ],

    "#": () => [
      sprite("Globi"),
      area({width: 40,}),
      origin("bot"),
      "Globi",
      z(3),
      solid()
    ],

    "*": () => [
      sprite("swissmap"),
      origin("center"),
      "swissmap",
      scale (width()/2000),
      z(1),
      pos(0, -35),
    ],

    "$": () => [
      sprite("grass"),
      origin("center"),
      "swissmap",
      scale (width()/1000),
    ],

  })

  add([
    pos(-20, 0),
    rect(20, 1000),
    area(),
    solid(),
  ])
  add([
    pos(0, -40),
    rect(2000, 20),
    area(),
    solid(),
  ])
  add([
    pos(0, 710),
    rect(2000, 20),
    area(),
    solid(),
  ])
  add([
    pos(1263, 0),
    rect(20, 1000),
    area(),
    solid(),
  ])

  const Globi = get("Globi")[0]

  const SPEED = 300;


  onKeyDown("w", () => {
    Globi.move(0, -SPEED)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("a", () => {
    Globi.move(-SPEED, 0)
    Globi.flipX(true)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("s", () => {
    Globi.move(0, SPEED)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("d", () => {
    Globi.move(SPEED, 0)
    Globi.flipX(false)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyRelease(["w", "a", "s", "d"], () => {
    if (Globi, !isKeyDown("a") && !isKeyDown("d")) {
      Globi.play("idle")
    }

  })
  Globi.onCollide("level_point", () => {
    go("Level_2", {
      levelIdx: 0,
    })
  })

})

scene("Map3", ({ levelIdx}) => {

  add([
    pos(0, 0),
    rect(5000, 5000),
    area(),
  ])

  const LEVELS = [
    [
      "#                  ",
      "       +           ",
      "        *          ",
      "       $           ",
      "                   ",
      "                    ",
      "  @    +           ",
      "                   ",
      "                   ",
    ],
  ]

  const level = addLevel(LEVELS[levelIdx || 0], {
    width: 64,
    height: 89,
    pos: vec2(100, 200),

    "+": () => [
      sprite("level_point_complete"),
      area(),
      origin("bot"),
      "level_point_complete",
      scale (width()/3000),
      pos(-20, -115),
      z(2),
      area({width: 120,}),
    ],

    "@": () => [
      sprite("level_point"),
      area(),
      origin("bot"),
      "level_point",
      scale (width()/3000),
      pos(240, -250),
      z(2),
      area({width: 120,}),
    ],

    "#": () => [
      sprite("Globi"),
      area({width: 40,}),
      origin("bot"),
      "Globi",
      z(3),
      solid()
    ],

    "*": () => [
      sprite("swissmap"),
      origin("center"),
      "swissmap",
      scale (width()/2000),
      z(1),
      pos(0, -35),
    ],

    "$": () => [
      sprite("grass"),
      origin("center"),
      "swissmap",
      scale (width()/1000),
    ],

  })

  add([
    pos(-20, 0),
    rect(20, 1000),
    area(),
    solid(),
  ])
  add([
    pos(0, -40),
    rect(2000, 20),
    area(),
    solid(),
  ])
  add([
    pos(0, 710),
    rect(2000, 20),
    area(),
    solid(),
  ])
  add([
    pos(1263, 0),
    rect(20, 1000),
    area(),
    solid(),
  ])

  const Globi = get("Globi")[0]

  const SPEED = 300;


  onKeyDown("w", () => {
    Globi.move(0, -SPEED)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("a", () => {
    Globi.move(-SPEED, 0)
    Globi.flipX(true)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("s", () => {
    Globi.move(0, SPEED)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("d", () => {
    Globi.move(SPEED, 0)
    Globi.flipX(false)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyRelease(["w", "a", "s", "d"], () => {
    if (Globi, !isKeyDown("a") && !isKeyDown("d")) {
      Globi.play("idle")
    }

  })
  Globi.onCollide("level_point", () => {
    go("Level_3", {
      levelIdx: 0,
    })
  })

})

scene("Map4", ({ levelIdx}) => {

  add([
    pos(0, 0),
    rect(5000, 5000),
    area(),
  ])

  const LEVELS = [
    [
      "#                  ",
      "       +           ",
      "?       *          ",
      "       $           ",
      "      +             ",
      "                   ",
      "       +           ",
      "                   ",
      "                   ",
    ],
  ]

  const level = addLevel(LEVELS[levelIdx || 0], {
    width: 64,
    height: 89,
    pos: vec2(100, 200),

    "+": () => [
      sprite("level_point_complete"),
      area(),
      origin("bot"),
      "level_point_complete",
      scale (width()/3000),
      pos(-20, -115),
      z(2),
      area({width: 120,}),
    ],

    "@": () => [
      sprite("level_point"),
      area(),
      origin("bot"),
      "level_point",
      scale (width()/3000),
      pos(240, -250),
      z(2),
      area({width: 120,}),
    ],

    "?": () => [
      sprite("door"),
      area(),
      origin("bot"),
      "door",
      scale (width()/4500),
      pos(-80, -100),
      z(2),
      area({width: 120,}),
    ],

    "#": () => [
      sprite("Globi"),
      area({width: 40,}),
      origin("bot"),
      "Globi",
      z(3),
      solid()
    ],

    "*": () => [
      sprite("swissmap"),
      origin("center"),
      "swissmap",
      scale (width()/2000),
      z(1),
      pos(0, -35),
    ],

    "$": () => [
      sprite("grass"),
      origin("center"),
      "swissmap",
      scale (width()/1000),
    ],

  })

  add([
    pos(-20, 0),
    rect(20, 1000),
    area(),
    solid(),
  ])
  add([
    pos(0, -40),
    rect(2000, 20),
    area(),
    solid(),
  ])
  add([
    pos(0, 710),
    rect(2000, 20),
    area(),
    solid(),
  ])
  add([
    pos(1263, 0),
    rect(20, 1000),
    area(),
    solid(),
  ])

  const Globi = get("Globi")[0]

  const SPEED = 300;


  onKeyDown("w", () => {
    Globi.move(0, -SPEED)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("a", () => {
    Globi.move(-SPEED, 0)
    Globi.flipX(true)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("s", () => {
    Globi.move(0, SPEED)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("d", () => {
    Globi.move(SPEED, 0)
    Globi.flipX(false)
    if (Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyRelease(["w", "a", "s", "d"], () => {
    if (Globi, !isKeyDown("a") && !isKeyDown("d")) {
      Globi.play("idle")
    }

  })
  Globi.onCollide("door", () => {
    go("Boss", {
      levelIdx: 0,
    })
  })

})


  scene("Level_1", ({ levelIdx}) => {

    const LEVELS = [

      [ "",
        "?                                         ?                                         ?              +                          ?                                          ?",
        "                                                                                  ==           ",
        " @ #                        =                         =                       =                ",
        " ====   ===        ==   =                        ==                               =       ==== ",
        "   /            ==                    ==     =              =     =     =     =                ",
        "                                   =                                                           ",
      ],
    ]

    const level = addLevel(LEVELS[levelIdx || 0 ], {
      width: 64,
      height: 89,
      pos: vec2(100, 200),

      "=": () => [
        sprite("Grassblock"),
        area(),
        origin("bot"),
        pos(60, -258),
        solid(),
        scale (width()/5000),
      ],

      "@": () => [
        sprite("level_point2"),
        area(),
        origin("bot"),
        "level_point2",
        scale (width()/3000),
        pos(60, -200),
        z(2),
        area({width: 120,}),
      ],

      "+": () => [
        sprite("level_point_complete2"),
        area(),
        origin("bot"),
        "level_point_complete2",
        scale (width()/3000),
        pos(-25, -137),
        z(2),
        area({width: 120,}),
      ],


      "#": () => [
        sprite("Globi"),
        area({width: 40,}),
        origin("bot"),
        pos(0, -200),
        body(),
        "Globi"
      ],

      "?": () => [
        sprite("Wallis"),
        origin("center"),
        pos(200, 0),
        scale (width()/1500),
      ],


    })

    const Globi = get("Globi")[0]

    const SPEED = 300;
    const JUMP_FORCE = 450

    const music = play("Level", {
      volume: 1,
      loop: true
    })

    gravity(1000)

    Globi.action(()=>{
      camPos(Globi.pos)
        }
    )

    Globi.onGround(() => {
      if (!isKeyDown("d") && !isKeyDown("a")) {
        Globi.play("idle")
      } else {
        Globi.play("run")
      }
    })

    Globi.onAnimEnd("idle", () => {
    })

    //Kaboom dosn't support the escape key: https://kaboomjs.com/#Key1
    document.body.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        go("Map", {
          levelIdx: 0,
        })
      }
    });

    onKeyPress("space", () => {
      if (Globi.isGrounded()) {
        Globi.jump(JUMP_FORCE)
        Globi.play("jump")
      }
    })

    onKeyDown("d", () => {
      Globi.move(SPEED, 0)
      Globi.flipX(false)
      if (Globi.isGrounded() && Globi.curAnim() !== "run") {
        Globi.play("run")
      }
    })

    onKeyDown("a", () => {
      Globi.move(-SPEED, 0)
      Globi.flipX(true)
      if (Globi.isGrounded() && Globi.curAnim() !== "run") {
        Globi.play("run")
      }
    })

    onKeyRelease(["a", "d"], () => {
      if (Globi.isGrounded() && !isKeyDown("a") && !isKeyDown("d")) {
        Globi.play("idle")
      }
    })

    Globi.onUpdate(() => {
      if (Globi.pos.y >= 800) {
        go("lose1")
      }
    })

    Globi.onCollide("level_point_complete2", () => {
      go("Map2", {
        levelIdx: 0,
      })
      play("Globisound")
      music.pause()
    })

    scene("lose1", () => {

      const player = add([
        sprite("end_screen"),
        scale (width()/1830),
        pos(0, -40),
      ])
      onKeyPress(start1)
      music.pause()
    })
  })

scene("Level_2", ({ levelIdx}) => {

  const LEVELS = [

    ["",
      "?                                        ?                                        ?     +                                  ?                                        ?               ",
      "                =                                                                           ",
      " @ #   =       ~                                £           £                              =    =                             ",
      " ===     ========     £     =          =        =    = £    =     =     =     =                     £                                    ",
      "   /                  =       £     £        =         =                                            =                 ",
      "                              =     =                                £                      £   =",
      "                                                                     =                =     =",
    ],
  ]

  const level = addLevel(LEVELS[levelIdx || 0 ], {
    width: 64,
    height: 89,
    pos: vec2(100, 200),

    "=": () => [
      sprite("Snowblock"),
      area(),
      origin("bot"),
      pos(60, -258),
      solid(),
      scale (width()/5000),
    ],

    "@": () => [
      sprite("level_point2"),
      area(),
      origin("bot"),
      "level_point",
      scale (width()/3000),
      pos(60, -200),
      z(2),
      area({width: 120,}),
    ],

    "+": () => [
      sprite("level_point_complete2"),
      area(),
      origin("bot"),
      "level_point_complete2",
      scale (width()/3000),
      pos(0, -190),
      z(2),
      area({width: 120,}),
    ],


    "#": () => [
      sprite("Globi"),
      area({width: 40,}),
      origin("bot"),
      pos(0, -200),
      body(),
      "Globi"
    ],

    "~": () => [
      sprite("French"),
      area({width: 40,}),
      origin("left"),
      pos(0, -200),
      body(),
      "French"
    ],

    "£": () => [
      sprite("Frenchwine"),
      area({width: 40,}),
      origin("left"),
      pos(35, -200),
      body(),
      "Frenchwine"
    ],

    "?": () => [
      sprite("Basel"),
      origin("center"),
      pos(-100, 0),
      scale (width()/1500),
    ],


  })

  const Globi = get("Globi")[0]
  const French = get("French")[0]

  const SPEED = 300;
  const JUMP_FORCE = 450

  gravity(1000)

  Globi.action(()=>{
        camPos(Globi.pos)
      }
  )


  Globi.onAnimEnd("idle", () => {
  })

  //Kaboom dosn't support the escape key: https://kaboomjs.com/#Key1
  document.body.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      go("Map2", {
        levelIdx: 0,
      })
    }
  });

  const music = play("Level", {
    volume: 1,
    loop: true
  })

  Globi.onCollide ("French", (e, col) => {
    if (!col.isBottom()) {
      go("lose2")
    }
  })

  French.play("run")


  Globi.onGround((l) => {
    if (l.is("French")) {
      Globi.jump(JUMP_FORCE * 1.1)
      destroy(l)
    }
  })

  French.onUpdate(()=>{
    French.move(- 100, 0)
  })

  Globi.onCollide ("Frenchwine", (e, col) => {
    if (!col.isBottom()) {
      go("lose2")
    }
  })

  Globi.onGround((l) => {
    if (l.is("Frenchwine")) {
      Globi.jump(JUMP_FORCE * 1.2)
      destroy(l)
    }
  })

  Globi.onGround(() => {
    if (!isKeyDown("d") && !isKeyDown("a")) {
      Globi.play("idle")
    } else {
      Globi.play("run")
    }
  })

  onKeyPress("space", () => {
    if (Globi.isGrounded()) {
      Globi.jump(JUMP_FORCE)
      Globi.play("jump")
    }
  })

  onKeyDown("d", () => {
    Globi.move(SPEED, 0)
    Globi.flipX(false)
    if (Globi.isGrounded() && Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("a", () => {
    Globi.move(-SPEED, 0)
    Globi.flipX(true)
    if (Globi.isGrounded() && Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyRelease(["a", "d"], () => {
    if (Globi.isGrounded() && !isKeyDown("a") && !isKeyDown("d")) {
      Globi.play("idle")
    }
  })

  Globi.onUpdate(() => {
    if (Globi.pos.y >= 650) {
      go("lose2")
    }
  })

  Globi.onCollide("level_point_complete2", () => {
    go("Map3", {
      levelIdx: 0,
    })
    play("Globisound")
  })

  scene("lose2", () => {

    const player = add([
      sprite("end_screen"),
      scale (width()/1830),
      pos(0, -40),
    ])
    onKeyPress(start2)
    music.pause()
  })
})

scene("Level_3", ({ levelIdx}) => {

  const LEVELS = [

    ["",
      "                                                                                                      +",
      "?                                          ?             &     &     &                ?   &     &    &                           ?                                        ?               ",
      "@                               £                    &                                £",
      "#~                     &    &   &                        &                           &&",
      "==     &     &     &                                 &                           & ",
      "                                                 £                          £",
      "                                       &     &   &                          &",
      "",
    ],
  ]

  const level = addLevel(LEVELS[levelIdx || 0 ], {
    width: 64,
    height: 89,
    pos: vec2(100, 200),

    "=": () => [
      sprite("Snowblock"),
      area(),
      origin("bot"),
      pos(60, -258),
      solid(),
      scale (width()/5000),
      z(2),
    ],

    "&": () => [
      sprite("Gravelblock"),
      area(),
      origin("bot"),
      pos(60, -258),
      solid(),
      scale (width()/5000),
      "Gravelblock",
      z(3),
    ],

    "!": () => [
      sprite("border"),
      area(),
      origin("bot"),
      pos(100, -200),
      solid(),
      scale (width()/50000),
    ],

    "@": () => [
      sprite("level_point2"),
      area(),
      origin("bot"),
      "level_point2",
      scale (width()/3000),
      pos(60, -110),
      z(2),
      area({width: 120,}),
      z(4)
    ],

    "+": () => [
      sprite("level_point_complete2"),
      area(),
      origin("bot"),
      "level_point_complete2",
      scale (width()/3000),
      pos(125, -290),
      z(2),
      area({width: 120,}),
    ],


    "#": () => [
      sprite("Globi"),
      area({width: 40,}),
      origin("bot"),
      pos(40, -200),
      body(),
      "Globi",
      z(1)
    ],

    "~": () => [
      sprite("French"),
      area({width: 50,}),
      origin("left"),
      pos(0, -200),
      body(),
      "French"
    ],

    "£": () => [
      sprite("Frenchwine"),
      area({width: 40,}),
      origin("left"),
      pos(35, -200),
      body(),
      "Frenchwine"
    ],

    "?": () => [
      sprite("Bern"),
      origin("center"),
      pos(200, 0),
      scale (width()/1480),
    ],


  })

  const Globi = get("Globi")[0]
  const French = get("French")[0]

  const SPEED = 300;
  const JUMP_FORCE = 450

  gravity(1000)

  const music = play("Level", {
    volume: 1,
    loop: true
  })

  Globi.action(()=>{
        camPos(Globi.pos)
      }
  )

  Globi.onGround((l) => {
    if (l.is("French")) {
      Globi.jump(JUMP_FORCE * 1.1)
      destroy(l)
    }
  })

  Globi.onCollide("Gravelblock", (c) => {
    wait(0.4, () => {
      destroy(c)
    })
  })


  French.onUpdate(()=>{
    French.move(-100, 0)
  })

  Globi.onCollide ("Frenchwine", (f, col) => {
    if (!col.isBottom()) {
      go("lose3")
    }
  })

  Globi.onGround((d) => {
    if (d.is("Frenchwine")) {
      Globi.jump(JUMP_FORCE * 1.2)
      destroy(d)
    }
  })

  //Kaboom dosn't support the escape key: https://kaboomjs.com/#Key1
  document.body.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      go("Map3", {
        levelIdx: 0,
      })
    }
  });

  Globi.onCollide ("French", (e, col) => {
    if (!col.isBottom()) {
      go("lose3")
    }
  })

  French.play("run")


  Globi.onGround(() => {
    if (!isKeyDown("d") && !isKeyDown("a")) {
      Globi.play("idle")
    } else {
      Globi.play("run")
    }
  })

  onKeyPress("space", () => {
    if (Globi.isGrounded()) {
      Globi.jump(JUMP_FORCE)
      Globi.play("jump")
    }
  })

  onKeyDown("d", () => {
    Globi.move(SPEED, 0)
    Globi.flipX(false)
    if (Globi.isGrounded() && Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("a", () => {
    Globi.move(-SPEED, 0)
    Globi.flipX(true)
    if (Globi.isGrounded() && Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyRelease(["a", "d"], () => {
    if (Globi.isGrounded() && !isKeyDown("a") && !isKeyDown("d")) {
      Globi.play("idle")
    }
  })

  Globi.onUpdate(() => {
    if (Globi.pos.y >= 650) {
      go("lose3")
    }
  })

  Globi.onCollide("level_point_complete2", () => {
    go("Map4", {
      levelIdx: 0,
    })
    play("Globisound")

    music.pause()
  })

  scene("lose3", () => {

    const player = add([
      sprite("end_screen"),
      scale (width()/1830),
      pos(0, -40),
    ])
    onKeyPress(start3)
    music.pause()
  })
})

scene("Boss", ({ levelIdx}) => {

  const LEVELS = [

    [
      "",
      "",
      "",
      "",
      "?",
      "           ç",
      "*                    *",
      "&#         £ ~       *",
      "================================",
    ],
  ]

  const level = addLevel(LEVELS[levelIdx || 0 ], {
    width: 64,
    height: 89,
    pos: vec2(100, 200),

    "=": () => [
      sprite("Snowblock"),
      area(),
      origin("bot"),
      pos(-100, -210),
      solid(),
      scale (width()/5000),
      "Snowblock"
    ],

    "*": () => [
      sprite("Grassblock"),
      area(),
      origin("bot"),
      pos(-140, -210),
      solid(),
      scale (width()/5000),
      z(0),
      "Grassblock"
    ],

    "&": () => [
      sprite("Gravelblock"),
      area(),
      origin("bot"),
      pos(-140, -210),
      solid(),
      scale (width()/5000),
      "Gravelblock",
    ],

    "!": () => [
      sprite("border"),
      area(),
      origin("bot"),
      pos(100, -200),
      solid(),
      scale (width()/50000),
    ],

    "#": () => [
      sprite("Globi"),
      area({width: 40,}),
      origin("bot"),
      pos(40, -100),
      body(),
      "Globi",
      z(3)
    ],

    "~": () => [
      sprite("French"),
      area({width: 50,}),
      origin("bot"),
      pos(0, -100),
      body(),
      "French",
      patrol(),
      z(2)
    ],

    "£": () => [
      sprite("Boss"),
      area({width: 135,}),
      origin("bot"),
      pos(0, -100),
      body(),
      scale (width()/2300),
      "Boss",
      z(1),
    ],

    "?": () => [
      sprite("bossbackground"),
      origin("center"),
      pos(620, -50),
      scale (width()/2650),
      z(1)
    ],

    "ç": () => [
      sprite("hat"),
      origin("center"),
      pos(-175, -420),
      scale (width()/2650),
      rotate(50),
      z(1),
      "hat",
      area({width: 200, height: 100}),

    ],
  })

  const Globi = get("Globi")[0]
  const French = get("French")[0]
  const Boss = get("Boss")[0]
  const SPEED = 300;
  const JUMP_FORCE = 450

  gravity(1000)

  Globi.onGround((l) => {
    if (l.is("French")) {
      Globi.jump(JUMP_FORCE * 1.1)
    }
  })

  Globi.onGround((l) => {
    if (l.is("Boss")) {
      Globi.jump(JUMP_FORCE * 1.1)
      destroy(l)
    }
  })

  const music = play("Bosssong", {
    volume: 1,
    loop: true
  })

  //Kaboom dosn't support the escape key: https://kaboomjs.com/#Key1
  document.body.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      go("Map4", {
        levelIdx: 0,
      })
    }
  });

  Globi.onCollide ("French", (e, col) => {
    if (!col.isBottom()) {
      go("lose4")
    }
  })

  Globi.onCollide ("Boss", (e, col) => {
    if (!col.isBottom()) {
      go("lose4")
    }
  })

  Globi.onCollide("hat", () => {
    go("Win", {
      levelIdx: 0,
    })
    play("Globisound")
  })
  function moveBoss() {
    const rand = Math.random();

    if (rand < 0.1) {
      Boss.move(20, 0);
    } else {
      Boss.move(-20, 0);
      Boss.flipX(false)
    }

    if (rand < 0.01) {
      Boss.jump(500);
    }

  }

 onUpdate(()=>{
   moveBoss();
 })


  French.onCollide("Grassblock", () => {
    French.flipX(false)
  })

  French.onCollide("Gravelblock", () => {
    French.flipX(true)
  })

  French.flipX(true)

  French.play("run")

  Boss.play("run")


  Globi.onGround(() => {
    if (!isKeyDown("d") && !isKeyDown("a")) {
      Globi.play("idle")
    } else {
      Globi.play("run")
    }
  })

  onKeyPress("space", () => {
    if (Globi.isGrounded()) {
      Globi.jump(JUMP_FORCE)
      Globi.play("jump")
    }
  })

  onKeyDown("d", () => {
    Globi.move(SPEED, 0)
    Globi.flipX(false)
    if (Globi.isGrounded() && Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyDown("a", () => {
    Globi.move(-SPEED, 0)
    Globi.flipX(true)
    if (Globi.isGrounded() && Globi.curAnim() !== "run") {
      Globi.play("run")
    }
  })

  onKeyRelease(["a", "d"], () => {
    if (Globi.isGrounded() && !isKeyDown("a") && !isKeyDown("d")) {
      Globi.play("idle")
    }
  })

  scene("lose4", () => {

    const player = add([
      sprite("end_screen"),
      scale (width()/1830),
      pos(0, -40),
    ])
    onKeyPress(start4)
    music.pause()
  })
})

scene("Win", ({ levelIdx}) => {
  const LEVELS = [
    [
      "*                  ",
      "                   ",
      "                   ",
      "                   ",


    ],
  ]
  const level = addLevel(LEVELS[levelIdx || 0], {
    width: 64,
    height: 89,
    pos: vec2(100, 200),

    "*": () => [
      sprite("Win"),
      area(),
      origin("bot"),
      "title_screen",
      scale(width() / 1900),
      pos(540, 520),
      z(1),
    ],


  })

  onKeyPress("space", () => {
    go("credits", {
      levelIdx: 0,
    })
  })
})

scene("credits", ({ levelIdx}) => {
  const LEVELS = [
    [
      "*                  ",
      "                   ",
      "                   ",
      "                   ",


    ],
  ]
  const level = addLevel(LEVELS[levelIdx || 0], {
    width: 64,
    height: 89,
    pos: vec2(100, 200),

    "*": () => [
      sprite("credits"),
      area(),
      origin("bot"),
      "credits",
      scale(width() / 3200),
      pos(540, 590),
      z(1),
    ],
  })
})

function start1() {
  go("Level_1", {
    levelIdx: 0,
  })
}
function start2() {
  go("Level_2", {
    levelIdx: 0,
  })
}
function start3() {
  go("Level_3", {
    levelIdx: 0,
  })
}

function start4() {
  go("Boss", {
    levelIdx: 0,
  })
}

  function start() {
    go("Title_screen", {
      levelIdx: 0,
    })
  }
  start()


