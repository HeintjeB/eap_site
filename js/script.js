document.addEventListener('DOMContentLoaded', () => {
    // Pak alle knoppen
    const buttons = document.querySelectorAll('.project_info_btn');

    // Voor elke knop: toggle de line-clamp van het bijbehorende div
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.parentElement;
            const icon = button.querySelector('svg');
            const textDiv = container.querySelector('div');
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


    let progressor = setInterval(cover_slider, 50)


    let i = 45;
    let idx = 0;
    const slices = document.querySelectorAll('.cover_slice');
    let cover_text = document.querySelector('.cover_text')
    let s6 = document.querySelectorAll('.s6')[0]
    let s7 = document.querySelectorAll('.s7')[0]
    let s8 = document.querySelectorAll('.s8')[0]
    let s9 = document.querySelectorAll('.s9')[0]
    let s10 = document.querySelectorAll('.s10')[0]
    let s11 = document.querySelectorAll('.s11')[0]
    let s12 = document.querySelectorAll('.s12')[0]
    let tekst_input = ["Bekijk onze use-cases voor de toepassing van LLM’s in bedrijfsprocessen", 
        "Expertise in onder andere Python, SQL en VBA.",
        "Ruime ervaring in het ontwerpen en programmeren van maatwerktools binnen BI-platforms zoals Qlik en Power BI.",
        "Gecertificeerd in het werken met Process Mining-tools zoals Celonis.",
            "Diepgaande kennis van diverse ERP-systemen."];
    function cover_slider() {
        if (i==50) {
            i = -5
            let slice = slices[idx]
            cover_text.classList.remove("ct_visible");
           
            if (idx < slices.length) {
            if (slice.href.baseVal && (slice.href.baseVal.includes('celonis'))) {
                    s7.style.fill = '#ffffff'; 

                } else if (slice.href.baseVal && (slice.href.baseVal.includes('bi'))) {
                    s8.style.fill = '#ffffff'; 
                } else if (slice.href.baseVal && (slice.href.baseVal.includes('python'))) {
                    s6.style.fill = '#ffffff'; 
                } else if (slice.href.baseVal.includes('ai')) {
                    s9.style.fill = '#1e72d6';  
                }
                slice.style.opacity = 1;
            }

            } else if (i==1) {
            cover_text.textContent = tekst_input[idx]
            cover_text.classList.add("ct_visible");
            i++
            idx++
            if (idx>slices.length) {
                cover_text.innerHTML = "Join the future, and grab your piece of automation!"; 
                cover_text.className = "sm:text-3xl text-2xl font-medium title-font text-[#6D6439] flex items-center justify-center" 
                s10.style.fill = "#ffffff" 
                s11.style.fill = "#d8a340ff" 
                s12.style.fill = "#ffffff"
                clearInterval(progressor)
            }
        } else {
            i++
        }
    
}
  
});
