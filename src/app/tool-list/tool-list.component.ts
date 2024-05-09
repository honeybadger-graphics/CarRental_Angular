import { Component, OnInit, inject } from '@angular/core';
import { ToolService } from '../services/tool.service';
import { ToolDTO } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-list',
  standalone: true,
  imports: [],
  templateUrl: './tool-list.component.html',
  styleUrl: './tool-list.component.css'
})
export class ToolListComponent implements OnInit {
  toolService = inject(ToolService);

  router = inject(Router);

  tools: ToolDTO[] = [];

  ngOnInit(): void {
    this.toolService.getAll().subscribe({
      next: tools => this.tools = tools,
      error: err => console.error(err)
    });
  }

  goToToolForm(id: number) {
    this.router.navigate([ '/edit-tool', id ]);
  }

  deleteTool(tool: ToolDTO) {
    this.toolService.delete(tool.id).subscribe({
      next: () => {
        const index = this.tools.indexOf(tool);
        if (index > -1) {
          this.tools.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
}
