<?php

namespace Compare_Public;

class Public_View {
	public function page() {
		$dir = new \DirectoryIterator( plugin_dir_path( dirname( __FILE__ ) )  . 'porownywarka/build/static/js' );

		$count = 0;
		foreach ($dir as $file) {
			if ($file->isDot()) continue;
			if ($file->getExtension() == 'js') {
				$count += 1;
				wp_enqueue_script('plugin-'.$count, "/wp-content/plugins/dev-system/includes/views/public/porownywarka/build/static/js/" . $file->getFilename(), array(), Null);
			}
		}

		$dir = new \DirectoryIterator( plugin_dir_path( dirname( __FILE__ ) )  . 'porownywarka/build/static/css' );

                $count = 0;
                foreach ($dir as $file) {
                        if ($file->isDot()) continue;
                        if ($file->getExtension() == 'css') {
                                $count += 1;
                                wp_enqueue_style('plugin-'.$count, "/wp-content/plugins/dev-system/includes/views/public/porownywarka/build/static/css/" . $file->getFilename(), array(), Null);
                        }
                }

		return file_get_contents(plugin_dir_path( dirname( __FILE__ ) ) . "porownywarka/public/index.html");
	}
}
