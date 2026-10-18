# 🕹️ Games

Four browser games, no build step — static files only. The root `index.html`
is a launcher that picks between them.

## 🐵 Monkey Escape (`monkey/`)

A 3D treetop chase obby: play a monkey escaping a chimpanzee across six
treetop stages. Built with [Three.js](https://threejs.org).

**Controls:** WASD/arrows to run, Space to jump (twice for a flip, hold to
glide), Shift to dash, E to throw a banana, Esc or P to pause, M to mute.
Touch controls on mobile. If your browser won't capture the mouse (or Chrome
refuses a re-lock right after Esc) the game falls back to hold-and-drag to
look. The game pauses itself when you switch tabs.

## ⚽ Pixel Pitch (`soccer/`)

A pixel-art 1v1 soccer game. Play online via share link or room code,
locally on one keyboard, or against the AI.

**Modes:** first to 5 goals, or timed 2:00 halves with golden goal ·
online 1v1 · local 2P · vs AI (Easy / Normal / Hard) · extra viewers on the
share link spectate. Esc or P pauses a vs-AI or local match (Enter quits to
the menu); M mutes.

**Controls:** arrows/WASD move · Space steals · hold Shift to charge a
shot, release to fire · X sprints (watch the stamina bar) · 1-4 emotes.
Local 2P: P1 = WASD/Q/E/F, P2 = arrows/Space/Shift/period.
Touch stick + buttons on mobile.

**On the pitch:** goalkeepers guard the middle — aim for the corners (a shot
into a corner usually beats the keeper, one at the middle never does).
Power-ups spawn mid-field (⚡ speed boost, ❄ freeze the opponent).
Goals get celebrations, confetti, and a slow-mo replay. Win/loss records
per character are kept in your browser.

**Roster:** Ronaldo · Messi · Mbappé · Lamine · Luis Díaz · Neymar ·
Morgan · Rodman · Horan — procedurally generated 12×16 pixel sprites,
each with their own speed/shot/tackle/control stats.

Multiplayer is WebRTC via [PeerJS](https://peerjs.com) and its free public
broker — no game server. The host simulates the match; the guest streams
inputs. A dropped connection pauses the match for 20s so the opponent can
rejoin.

### Connection troubleshooting

If the lobby says the players found each other but can't connect:

1. **VPN / office network** — if either player is on one, disconnect it and
   reload (symmetric NAT blocks direct WebRTC).
2. **Add a TURN relay** — create a free account at
   [metered.ca](https://www.metered.ca/stun-turn), then open the game with
   your credentials in the URL:

   ```
   soccer/index.html?turn=USERNAME:CREDENTIAL@standard.relay.metered.ca
   ```

   The setting is remembered in the browser and automatically included in
   the share link, so your opponent gets the relay too.

## 🎯 Standup Paintball (`paintball/`)

A 3D, bot-driven paintball match that decides who runs standup: paste the
team's names, they're split into two teams, and the last person standing
wins. One hit eliminates; when a team is wiped out, the survivors are
reshuffled into new teams until one player is left. Built with
[Three.js](https://threejs.org) r128.

**Watching:** the camera follows the leader (click a name to follow
someone else), with a kill cam, minimap, kill feed, bot chat, emotes and
wall sprays. **Playing:** pick your name to take over that bot — WASD to
move, mouse to aim (click the game to lock it), click to fire, Space
jumps, C crouches, R reloads, Q smoke, G paint grenade, T spray.

**Bot training:** the Bot training panel tunes the bots by playing
thousands of headless matches on background Web Workers, separately for
team matches and free-for-all. "Settings" tunes 26 behavior settings with
SPSA, "Neural net" trains three small networks on top with evolution
strategies, and a sequential test only promotes a brain that beats the
current champion. Saved brains are kept in the browser.

**Online:** press **Create online room** and share the link (`?room=CODE`).
Everyone who opens it joins the room and picks who they're playing as; one
person presses **Host this match online** and starts the match, and bots
play every name nobody picked. Online matches are free-for-all. It's
peer-to-peer WebRTC via [PeerJS](https://peerjs.com) and its free public
broker, with the first person in the room relaying messages for the rest —
keep the host's and the room creator's tabs open. On strict networks add a
TURN relay the same way as Pixel Pitch: `paintball/?turn=USER:CREDENTIAL@host`
(it's remembered and carried in the share link).

Your own movement, jumps and shots run in your browser, so they respond
instantly; the host takes your browser's word for where you are, fires the
same shots, and decides what they hit. Everyone else is drawn about a tenth
of a second in the past so their motion stays smooth through network jitter.
Lag is lowest when the person who created the room also hosts, since every
message then takes one hop instead of two. Everyone in a room needs the same
version of the page: if someone can't see the others, have everyone reload.

Saved bot brains live in each browser. Announcer callouts play the clips in
`paintball/clips/`.

## 💊 Hardline (`hardline/`)

A voice-first co-op escape set inside a Matrix-style construct, for two
players — or **solo**. One of you is **jacked in** and sees a 3D room but
can't read it; the other holds the **manual** that can read it but can't see
it. (Solo: you do both — the manual is a pull-up overlay, key **M**.) No in-game chat —
start a Discord call, describe what you see, and beat the clock. Built with
[Three.js](https://threejs.org) (vendored, minified).

**Runs: Classic** (5 rooms) · **Deep Loop** (6 harder rooms) · **Gauntlet** (all 11).
Roles swap every room; a wrong answer costs 15 s off the shared clock; running
out of time re-rolls the room instead of ending the run.

**Playing:** *Play solo* needs nothing but your tab. For two players, open the
page, *Create a private session*, and send your partner
the four-letter code or invite link. There is no game server — like Pixel
Pitch, it is WebRTC through PeerJS's public broker, and **the creator's tab
runs the game**, so the host has to keep it open. *Show on TV* opens a
spoiler-free bridge display you can cast to a Chromecast. The same TURN option
as Pixel Pitch (`?turn=USER:CRED@host`) applies for VPNs and strict networks.

The game has its own [README](hardline/README.md) (rooms, architecture, tests)
and an optional Node server for LAN play: `cd hardline && npm install && npm start`.

## Run locally

```sh
npx serve .
```

Then open the printed URL — or deploy the repo to any static host
(GitHub Pages works as-is).
