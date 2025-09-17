// solo.js
document.addEventListener('DOMContentLoaded', () => {
    const playerStatus = document.getElementById('player-status');
    let playerData = {
        id: 'player-1',
        level: 1,
        experience: 0,
        health: 100,
        items: []
    };

    function updatePlayerStatus() {
        playerStatus.innerHTML = `
            <p>レベル: ${playerData.level}</p>
            <p>経験値: ${playerData.experience}</p>
            <p>HP: ${playerData.health}</p>
            <p>アイテム: ${playerData.items.join(', ') || 'なし'}</p>
        `;
    }

    document.getElementById('start-explore-btn').addEventListener('click', async () => {
        // 自動探索のロジック
        playerData.experience += 10; // 経験値を加算
        playerData.health -= 5; // HPを減少
        updatePlayerStatus();
        alert('自動探索が完了しました！');
    });

    document.getElementById('start-manual-btn').addEventListener('click', () => {
        // 手動探索のロジック
        alert('手動探索を開始しました！');
    });

    // 初期プレイヤーステータスの表示
    updatePlayerStatus();
});