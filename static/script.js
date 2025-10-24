document.addEventListener('DOMContentLoaded', () => {
    // Pak alle knoppen
    const buttons = document.querySelectorAll('.project_info_btn');

    // Voor elke knop: toggle de line-clamp van het bijbehorende div
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement;
            const icon = button.querySelector('svg');
            const textDiv = container.querySelector('div');
            console.log(textDiv);
            if (textDiv.classList.contains('line-clamp-3')) {
                textDiv.classList.remove('line-clamp-3');
                const span_icon = button.querySelector("#hex_icon");
                span_icon.classList.toggle('rotate-90')
                const span_text = button.querySelector("#button_text");
                span_text.innerText = 'Minder weergeven';
            } else {
                textDiv.classList.add('line-clamp-3');
                const span_icon = button.querySelector("#hex_icon");
                span_icon.classList.remove('rotate-90')
                const span_text = button.querySelector("#button_text");
                span_text.innerText = 'Meer over dit project';
            }
        });

    });
});

