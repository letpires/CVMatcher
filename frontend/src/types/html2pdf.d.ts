declare module 'html2pdf.js' {
  interface Options {
    margin?: number;
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number };
    jsPDF?: { unit: string; format: string; orientation: string };
  }

  interface HTML2PDF {
    set: (options: Options) => HTML2PDF;
    from: (element: HTMLElement) => HTML2PDF;
    save: () => Promise<void>;
  }

  function html2pdf(): HTML2PDF;
  export = html2pdf;
} 