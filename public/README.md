## 古月空岛（GuYueIsland）

一个完善、现代、可配置的 Minecraft 空岛生存管理插件。提供岛屿生成与边界、规则与权限、职业天赋、岛屿等级、岛屿效果、经济商店、幸运抽奖、成员/邀请、群系选择、TPA 传送等一站式玩法，配合全套 GUI 交互与异步队列，开箱即用、性能友好。

### 依赖与兼容
- 依赖：`WorldEdit`（示意图粘贴/结构加载）、`Vault`（经济）
- MC/服务端：建议 Paper/Spigot 1.13+（`api-version: 1.13`），内置多版本桥接适配，较老或较新版本将尽力兼容

---

## 功能总览

- **岛屿生成与管理**：
  - 多示意图样式（普通/沙漠/菌丝/橡木老岛/地狱森林/白桦之林/老实岛等）
  - 异步生成队列与防重叠定位；自动边界屏障；可配置半径/高度
  - 家点回岛、设置出生点、查看信息、统计数据
- **岛屿规则与保护**：
  - PVP、怪物生成、天气、时间锁定、访客容器/方块修改/PVP 等可切换
  - 访客/爆炸/锁岛等可绕过权限（管理员或特权角色）
- **成员与邀请**：
  - GUI 管理成员、邀请、接受/拒绝；权限受控
- **群系选择**：
  - 专用 GUI，细粒度群系选择权限节点
- **经济与商店**：
  - GUI 商店（分类/图标/价格倍率/指令发放），支持买卖与自定义指令奖励
- **岛屿效果（常驻/临时）**：
  - 生命上限/速度/急迫/力量/跳跃等，常驻每5秒刷新一次；临时效果与限购飞行
- **岛屿等级**：
  - 区域内破坏/放置方块获得经验；多级奖励，5级解锁效果功能（可配）
- **幸运抽奖**：
  - 多层权重奖池（普通/稀有/贵重/特殊），含物品/金钱/经验/药水/实体/指令等
- **TPA 系统**：
  - 岛内/好友便捷请求与 GUI 确认
- **虚空回拉与掉落保护**：
  - 掉入虚空自动回拉至安全位并上抬；可配半径与高度
- **破石随机矿**：
  - 基于圆石机的随机矿石生成，支持档位与全随机开关
- **多语言**：
  - `zh_CN`/`en_US` 资源，运行时可切换

---

## 指令总览（/is | /island）

以下子命令由主命令 `/is` 提供，实际展示以服内帮助为准：

- `/is create [类型]`：创建岛屿（从 GUI 或指定类型）
- `/is delete`：删除当前岛屿（需确认/权限）
- `/is list`：查看可用岛屿类型
- `/is info`：查看岛屿信息
- `/is home`：回到岛屿
- `/is setspawn`：设置岛屿出生点
- `/is members`：管理成员 GUI
- `/is settings`：岛屿设置/规则 GUI
- `/is level`：查看岛屿等级
- `/is exp`：查看岛屿经验
- `/is stats`：查看岛屿统计
- `/is money`：查看你的金币余额
- `/is effects`：打开岛屿效果购买/升级 GUI（达到解锁等级后）
- `/is admin`：管理员面板

> 提示：商店、职业/天赋、抽奖、群系选择、TPA 等入口均可从主菜单或对应 GUI 进入。

---

## 权限节点

基础与管理：
- `guyueisland.use`：使用基本空岛功能（默认 true）
- `guyueisland.create`：创建岛屿（默认 true）
- `guyueisland.delete`：删除岛屿（默认 true）
- `guyueisland.admin`：管理员（默认 op），隐式包含：
  - `guyueisland.use`、`guyueisland.create`、`guyueisland.delete`
  - `guyueisland.island.invite`、`guyueisland.island.members.manage`
  - `guyueisland.island.settings.modify`、`guyueisland.island.rules.modify`
  - `guyueisland.island.setspawn`、`guyueisland.island.info`、`guyueisland.island.home`

岛屿操作：
- `guyueisland.island.invite`：邀请成员（默认 true）
- `guyueisland.island.members.manage`：管理成员（默认 true）
- `guyueisland.island.settings.modify`：修改设置（默认 true）
- `guyueisland.island.rules.modify`：修改规则（默认 true）
- `guyueisland.island.setspawn`：设置出生点（默认 true）
- `guyueisland.island.info`：查看岛屿信息（默认 true）
- `guyueisland.island.home`：回到岛屿（默认 true）

规则面板与具体切换：
- `guyueisland.island.rules.open`：打开规则/设置 GUI（默认 true）
- `guyueisland.island.rules.set.pvp`：切换 PVP（默认 false）
- `guyueisland.island.rules.set.mob`：切换生物生成（默认 false）
- `guyueisland.island.rules.set.weather`：切换天气变化（默认 false）
- `guyueisland.island.rules.set.time`：切换时间锁定（默认 false）
- `guyueisland.island.rules.set.visitor_pvp`：切换访客 PVP（默认 false）
- `guyueisland.island.rules.set.visitor_container`：切换访客容器（默认 false）
- `guyueisland.island.rules.set.visitor_block`：切换访客方块修改（默认 false）

群系选择：
- `guyueisland.biome.open`：打开群系 GUI（默认 true）
- `guyueisland.biome.apply`：岛主应用群系到自岛（默认 true）
- `guyueisland.biome.apply.others`：成员/管理为加入的岛应用（默认 false）
- 类型白名单（默认 true）：
  - `guyueisland.biome.type.plains`/`desert`/`jungle`/`taiga`/`savanna`/`snowy_tundra`/`mushroom_fields`/`badlands`/`swamp`/`mangrove_swamp`

经济/商店/效果：
- `guyueisland.money`：查看金币余额（默认 true）
- `guyueisland.shop.open`：打开空岛商店（默认 true）
- `guyueisland.effects.open`：打开效果界面（默认 true）
- `guyueisland.effects.buy`：购买/升级效果（仅岛主，默认 true）

保护绕过：
- `guyueisland.bypass.pvp`：忽略访客 PVP 限制（默认 false）
- `guyueisland.bypass.container`：忽略访客容器限制（默认 false）
- `guyueisland.bypass.block`：忽略访客方块修改限制（默认 false）
- `guyueisland.bypass.explosion`：忽略防爆保护（默认 false）
- `guyueisland.bypass.lock`：忽略“锁岛”进入限制（默认 false）

> 注意：实际权限应结合服内身份组/继承关系进行分配。普通玩家建议仅授予基础与必要项；具体规则切换权限可仅赋予岛主或管理员角色。

---

## GUI 一览

- `MainMenu` 主菜单：入口总览（成员/设置/效果/商店/抽奖/职业/群系/TPA/返回岛屿）
- `IslandSelection` 岛屿选择：列出所有已配置示意图与价格、说明
- `IslandRules` 规则设置：切换 PVP/怪物/天气/时间/访客权限
- `Members` 成员管理：邀请/移除/权限位（按实现）
- `IslandEffects` 效果：常驻效果购买与升级、临时效果与飞行
- `IslandLevel` 等级：查看等级、经验、奖励提示
- `Shop` 商店：按分类浏览购买/回收，支持指令发放
- `Talents` 职业/天赋：选择职业并升级节点
- `BiomeSelect` 群系选择：按权限可见与应用
- `Invite` 邀请处理：接受/拒绝
- `TPA` 请求：向队友/成员发起与响应
- `Admin` 管理：管理员工具集（传送/删除/查询等）

---

## 配置详解

### settings.yml（主配置）
关键项：

```yml
lang: zh_CN           # 多语言：zh_CN / en_US
logs:
  english: false

paste:
  random-rotate: true  # 生成时随机旋转
  random-mirror: true  # 生成时随机镜像

void-pull:
  enabled: true
  search-radius: 1
  upward-offset: 6

cobble-gen:
  enabled: true
  tier: low
  full-random: false

economy:
  purchase:
    enabled: true      # 岛屿类型价格生效
  first-join:
    enabled: true
    amount: 1000.0

announce:
  first-island:
    enabled: true
    message: "§6§l[*公告*] §e玩家 %player% §7创建了他的第一个空岛: §f%type%"

professions.enabled: true
talents.enabled: true
tpa.enabled: true
```

### schematics.yml（示意图与边界/GUI）
关键项：

```yml
island_spacing:
  x_distance: 2000
  z_distance: 2000

island_boundary:
  chunks_radius: 6   # 半径=区块数*16=96 方块
  barrier_height: 3

gui:
  title: "§a§l[*古月空岛*] §e选择你的岛屿类型"
  size: 36

islands:
  normal:
    slot: 10
    material: GRASS_BLOCK
    schematic: "normal"
    price: 0
    nether: ""  # 留空：回退 normal_nether
    end: ""     # 留空：回退 normal_the_end

  oak_old:
    slot: 13
    material: OAK_LOG
    schematic: "橡木老岛"
    price: 500
```

说明：
- `schematics/` 下放置 `.schematic` 文件，名称需与 `schematic` 字段匹配（中文文件名可用）
- 若 `nether`/`end` 留空，且对应默认文件存在，将自动回退使用默认下界/末地结构

### effects.yml（岛屿效果）
常驻效果（岛主与成员在自己岛内生效，5 秒刷新一次）：

```yml
effects:
  health:
    max-level: 5
    hearts-per-level: 2.0
    price-per-level: [500,600,700,800,900]
  speed/haste/strength/jump: ...

temp:
  durations-minutes: [30,60,180,720]
  fly:
    enabled: true
    max-purchases-per-day: 3
    minutes-per-purchase: 15
    price-per-purchase: 1000.0
```

提示：
- 力量上限强制不超过 II；离开所属岛屿立即清除
- 临时效果不包含生命上限（health 不在 temp 中）

### island-level.yml（等级/经验/奖励）

```yml
island.radius: 10000
unlocks.effects_level: 5  # 达到此等级解锁效果面板

experience:
  global:
    chance: 1.0
    min_exp: 1
    max_exp: 5
  break:
    STONE: {exp: 1, chance: 0.9}
    DIAMOND_ORE: {exp: 5, chance: 0.7}
    ...

levels:
  exp-requirements:
    1: 100
    2: 250
    ...
  rewards:
    5:
      money: 2000.0
      broadcast: true
      commands:
        - "broadcast {player} 的岛屿达到了5级，解锁了效果功能！"
```

### shop.yml（经济商店）

价格公式：
- 实际购买价 = `buy × base-multiplier × 分类倍率 × 单品倍率`
- 实际出售价 = `sell × base-multiplier × 分类倍率 × 单品倍率`

要点：
- 支持分类图标（含 `PLAYER_HEAD` 与自定义贴图 URL）
- 支持 `command_on_buy`（购买执行指令，用于精确发放附魔书等）
- 默认内置常用分类：建筑/实用/矿物与锭/食物/武器/护甲/工具/种植/书籍/染料/羊毛/下界/末地/掉落/酿造/装饰/花卉/交通/稀有终局

### luckyblocks.yml（幸运抽奖）

```yml
enabled: true
price-per-draw: 800.0
weights: {common: 70, rare: 20, valuable: 8, special: 2}
tiers: ITEM/MONEY/XP/POTION/ENTITY/COMMAND 多类型混合
```

说明：
- 抽奖同时包含正/负面结果（如怪物/TNT/负面药水/扣费等），请合理向玩家告知
- `COMMAND` 奖励会以控制台执行，支持 `{player}` 占位符

### talents.yml（职业/天赋）

- 内置职业：战斗家、肉盾、弓箭手、建造师、奶妈
- 每个职业包含多个节点（`max_level`、`price_per_level`、`req_island_level`）
- 主动技能均有冷却与触发手势说明（如“蹲下手持剑左键释放战吼”）

---

## 岛屿类型与示意图（Schematics）

1. 将新示意图文件放入 `src/main/resources/schematics/`（或打包后 `plugins/GuYueIsland/schematics/`）
2. 在 `schematics.yml -> islands` 下新增条目，配置 `slot/material/name/lore/schematic/price` 等
3. 可为下界/末地分别配置对应示意图；留空将尝试回退默认

> 建议配合 `random-rotate/mirror` 提升每次生成的随机性与可玩性。

---

## 保护与边界

- 岛屿边界：基于区块半径与屏障高度生成环形屏障
- 规则控制：通过 `IslandRules GUI` 开关功能；细粒度权限控制具体切换项
- 绕过权限：为巡查/活动提供必要的临时能力（`guyueisland.bypass.*`）
- 虚空回拉：掉入虚空自动回拉并上抬到安全位置

---

## 安装与升级

1. 安装依赖：将 `WorldEdit`、`Vault` 放入 `plugins/`
2. 放入本插件 `GuYueIsland-x.y.jar` 至 `plugins/`
3. 首次启动后停止服务器，按需修改 `settings.yml/schematics.yml/...`
4. 重启服务器；在游戏内使用 `/is` 打开主菜单进行体验

升级建议：
- 覆盖前请备份 `plugins/GuYueIsland/` 配置与数据
- 对应版本的服务端（建议 Paper 1.13+）与依赖请保持最新稳定版

---

## 常见问题（FAQ）

- Q：生成的岛屿会重叠吗？
  - A：不会。插件按 `island_spacing` 进行分配，且生成使用异步队列。
- Q：玩家离开岛屿后常驻效果还在吗？
  - A：不会。效果刷新周期为 5 秒，离开所属岛屿将立即清除。
- Q：商店能卖/买自定义物品或附魔书吗？
  - A：可以。通过 `command_on_buy` 精确定义发放指令即可。
- Q：抽奖有负面结果吗？
  - A：有。请在宣传与规则中提示玩家，避免争议。
- Q：如何切换语言？
  - A：在 `settings.yml` 设置 `lang: zh_CN` 或 `en_US`，并重启/热重载插件。

---

## 开发与二次定制

- 主类：`org.guyue.GuYueIsland.GuYueIsland`
- 命令注册：`register/CommandRegister.java`
- 监听器：`listeners/*`（保护、爆炸、虚空、交互、生成等）
- NMS 适配：`nms/*`（多版本桥，尽量兼容常见版本）
- GUI 实现：`gui/*`（主菜单/成员/规则/商店/效果/等级/职业/抽奖/群系/TPA/Admin）
- 配置载入：`config/*`；语言文件位于 `resources/lang/`

---

## 许可证与鸣谢

- 许可证：MIT
- 特别感谢：WorldEdit、Vault 及 Paper 社区

---

## 更新日志

### v1.1.0
- 新增多款示意图与 GUI 说明完善
- 完整权限与配置示例补充
- 等级解锁与效果体系优化

### 历史
- v1.0：基础岛屿/命令/GUI/5 种示意图/异步生成

---

如有问题或建议，欢迎提交 Issue / PR，一起让空岛更好玩！
