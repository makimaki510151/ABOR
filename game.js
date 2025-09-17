document.addEventListener('DOMContentLoaded', async () => {
    // データベースを初期化
    await window.db.openDB();

    // 画面遷移の関数
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // ボタンのイベントリスナー
    document.getElementById('solo-play-btn').addEventListener('click', () => {
        showScreen('solo-screen');
    });

    document.getElementById('multi-play-btn').addEventListener('click', () => {
        showScreen('multi-screen');
    });

    document.getElementById('start-explore-btn').addEventListener('click', () => {
        // オフライン探索ロジックの呼び出し
        // ...
        alert('自動探索を開始しました！');
    });

    // メニューに戻るボタン
    document.querySelectorAll('[id^="back-to-menu"]').forEach(btn => {
        btn.addEventListener('click', () => showScreen('start-screen'));
    });
    
    // 初期画面を表示
    showScreen('start-screen');
});